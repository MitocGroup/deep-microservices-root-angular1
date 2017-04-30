/**
 * Created by acucer on 3/17/16.
 */

'use strict';

import AWS from 'aws-sdk';
import https from 'https';
import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {*} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param {*} request
   * @todo refactor for direct call only (avoid SQS->SNS invokations)
   */
  handle(request) {
    let queueName = this._getQueueNameFromRequest(request);
    let queueUrl = this._getQueueUrlFromConfig(queueName);
    let sqs = this._sqs(queueUrl);
    let dynamo = this._dynamo;

    this._poolQueueUntilEmpty(queueUrl, sqs, dynamo).then(() => {
      let cloudWatch = this._cloudWatch(queueUrl);

      if (!this._isInvokedBySns(request)) {
        return this.createResponse({}).send();
      }

      // @see deep-package-manager (queueName === alarmName)
      this._resetAlarmState(cloudWatch, queueName)
        .then(this.createResponse({}).send);
    });
  }

  /**
   * Avoid keeping alarm state infinitely in case there are
   * messages pushed before the alarm switching to OK state
   *
   * @param {AWS.CloudWatch|*} cloudWatch
   * @param {String} alarmName
   * @returns {Promise|*}
   * @deprecated
   */
  _resetAlarmState(cloudWatch, alarmName) {
    return new Promise(resolve => {
      let payload = {
        AlarmName: alarmName,
        StateReason: 'Resetting alarm state to avoid keeping it on ALARM infinitely',
        StateValue: 'OK'
      };

      cloudWatch.setAlarmState(payload, error => {
        if (error) {
          console.error(error);
        }

        resolve();
      });
    });
  }

  /**
   * @param {String} queueUrl
   * @param {AWS.SQS|*} sqs
   * @param {AWS.DynamoDB|*} dynamo
   * @returns {Promise|*}
   * @private
   */
  _poolQueueUntilEmpty(queueUrl, sqs, dynamo) {
    return new Promise(resolve => {
      this._poolQueueItems(sqs, queueUrl)
        .catch(error => {
          console.error(error);

          resolve();
        })
        .then(queueMessages => {
          if (queueMessages.length <= 0) {
            return resolve();
          }

          Promise
            .all(queueMessages.map(
              queueMsg => this._manageQueueMsg(sqs, queueUrl, dynamo, queueMsg)
            ))
            .then(() => {
              this._poolQueueUntilEmpty(queueUrl, sqs, dynamo).then(resolve);
            });
        });
    });
  }

  /**
   * @param {AWS.SQS|*} sqs
   * @param {String} queueUrl
   * @returns {Promise|*}
   */
  _poolQueueItems(sqs, queueUrl) {
    return new Promise((resolve, reject) => {
      let payload = {
          QueueUrl: queueUrl,
          VisibilityTimeout: 20,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 10,
      };

      sqs.receiveMessage(payload, (error, data) => error ? reject(error) : resolve(data.Messages || []));
    });
  }

  /**
   * @param {AWS.SQS|*} sqs
   * @param {String} queueUrl
   * @param {AWS.DynamoDB|*} dynamo
   * @param {Object} queueMsg
   * @returns {Promise|*}
   */
  _manageQueueMsg(sqs, queueUrl, dynamo, queueMsg) {
    return new Promise((resolve, reject) => {
      let method = null;
      let payload = null;

      try {
        let dynamoOpObj = JSON.parse(queueMsg.Body);
        method = dynamoOpObj.method;
        payload = dynamoOpObj.payload;

        if (!method) {
          throw new Error(`Missing SQS-DDB offload op method in #${queueMsg.MessageId} (${queueUrl})`);
        } else if (!payload) {
          throw new Error(`Missing SQS-DDB offload op payload in #${queueMsg.MessageId} (${queueUrl})`);
        }
      } catch (error) {

        // todo: handle such kind of exceptions
        return this._deleteQueueMsg(sqs, queueUrl, queueMsg.ReceiptHandle)
          .then(() => reject(error))
          .catch(() => reject(error));
      }

      dynamo[method](payload, error => {
        if (error) {
          return reject(error);
        }

        this
          ._deleteQueueMsg(sqs, queueUrl, queueMsg.ReceiptHandle)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  /**
   * @param {AWS.SQS|*} sqs
   * @param {String} queueUrl
   * @param {String} receiptHandle
   * @returns {Promise|*}
   */
  _deleteQueueMsg(sqs, queueUrl, receiptHandle) {
    return new Promise((resolve, reject) => {
      sqs.deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: receiptHandle,
      }, error => error ? reject(error) : resolve());
    });
  }

  /**
   * @returns {AWS.DynamoDB.DocumentClient|*}
   */
  get _dynamo() {
    AWS.config.maxRetries = 3;

    return new AWS.DynamoDB.DocumentClient({
      httpOptions: {
        agent: new https.Agent({
          rejectUnauthorized: true,
          keepAlive: true,
          secureProtocol: 'TLSv1_method',
          ciphers: 'ALL',
        }),
      },
    });
  }

  /**
   * @param {String} queueUrl
   * @returns {AWS.SQS|*}
   */
  _sqs(queueUrl) {
    let region = this._getRegionFromSqsQueueUrl(queueUrl);

    return new AWS.SQS({region,});
  }

  /**
   * @param {String} queueUrl
   * @returns {AWS.CloudWatch|*}
   */
  _cloudWatch(queueUrl) {
    let region = this._getRegionFromSqsQueueUrl(queueUrl);

    return new AWS.CloudWatch({region,});
  }

  /**
   * @param {String} queueUrl
   * @returns {String}
   * @private
   */
  _getRegionFromSqsQueueUrl(queueUrl) {
    let regionParts = queueUrl.match(/\.([^\.]+)\.amazonaws\.com\/.*/i);

    if (!regionParts || regionParts.length === 0) {
      throw new Error(queueUrl, 'Unable to extract AWS region.');
    }

    return regionParts[1];
  }

  /**
   * @param {*} request
   * @returns {Boolean}
   */
  _isInvokedBySns(request) {
    return !!request.getParam('Records');
  }

  /**
   * @param {*} request
   * @returns {String}
   * @private
   * @todo: pre-validate event data
   */
  _getQueueNameFromRequest(request) {
    if (!this._isInvokedBySns(request)) {
      return request.getParam('queueName');
    }

    // @deprecated left for back compatibility only
    // SQS event delivered through SNS topic
    return JSON.parse(request.getParam('Records')[0].Sns.Message).Trigger.Dimensions[0].value;
  }

  /**
   * @param {String} queueName
   * @returns {String}
   */
  _getQueueUrlFromConfig(queueName) {
    let queues = this.kernel.config.dbOffloadQueues;

    for (let modelName in queues) {
      if (!queues.hasOwnProperty(modelName)) {
        continue;
      }

      let queueConfig = queues[modelName];

      if (queueConfig.name === queueName) {
        return queueConfig.url;
      }
    }

    return null;
  }
}
