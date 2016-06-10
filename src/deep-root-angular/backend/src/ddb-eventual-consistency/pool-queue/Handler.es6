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
   */
  handle(request) {
    let queueUrl = this._getQueueUrl(request);
    let sqs = this._sqs(queueUrl);
    let dynamo = this._dynamo;

    this._poolQueueUntilEmpty(queueUrl, sqs, dynamo);
  }

  /**
   * @param {String} queueUrl
   * @param {AWS.SQS|*} sqs
   * @param {AWS.DynamoDB|*} dynamo
   * @private
   */
  _poolQueueUntilEmpty(queueUrl, sqs, dynamo) {
    this._poolQueueItems(sqs, queueUrl)
      .catch(error => this.createError(error))
      .then(queueMessages => {
        if (queueMessages.length <= 0) {
          return this.createResponse({}).send();
        }

        Promise
          .all(queueMessages.map(
            queueMsg => this._manageQueueMsg(sqs, queueUrl, dynamo, queueMsg)
          ))
          .then(() => {
            this._poolQueueUntilEmpty(queueUrl, sqs, dynamo);
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

        // TODO: handle such kind of exceptions
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
   * @returns {String}
   * @private
   * @todo: pre-validate event data
   */
  _getQueueUrl(request) {
    let queueName = JSON.parse(request.getParam('Records')[0].Sns.Message).Trigger.Dimensions[0].value;

    return this._getQueueUrlFromConfig(queueName);
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
