/* jshint expr: true */

/**
 * Created by acucer on 6/14/16.
 */

'use strict';

import AWS from 'aws-sdk';
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
    Promise
      .all(this._queues.map(queueConfig => this._checkQueue(queueConfig)))
      .then(this.createResponse({}).send);
  }

  /**
   * @param {Object} queueConfig
   * @returns {Promise|*}
   */
  _checkQueue(queueConfig) {
    return new Promise(resolve => {
      let payload = {
        QueueUrl: queueConfig.url,
        AttributeNames: ['ApproximateNumberOfMessages',],
      };

      queueConfig.sqs.getQueueAttributes(payload, (error, data) => {
        if (error) {
          console.error(error);
          return resolve();
        }

        let attrs = data.Attributes || {
          ApproximateNumberOfMessages: '0', // o_O AWS sends a string
        };

        if (parseInt(attrs.ApproximateNumberOfMessages) > 0) {
          return this._invokePullQueue(queueConfig.name)
            .then(resolve)
            .catch(error => {
              console.error(error);
              resolve();
            });
        }

        resolve();
      });
    });
  }

  /**
   * @param {String} queueName
   * @returns {Promise|*}
   */
  _invokePullQueue(queueName) {
    return new Promise((resolve, reject) => {
      let resource = this.kernel.get('resource');

      resource
        .get(this._pullQueueResourceId)
        .request({queueName,})
        .invokeAsync()
        .send((response) => {
          response.isError ? reject(response.error) : resolve();
        });
    });
  }

  /**
   * @returns {String}
   */
  get _pullQueueResourceId() {
    return `@${this.kernel.microservice().identifier}:ddb-eventual-consistency:pool-queue`;
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
   * @returns {Object[]}
   */
  get _queues() {
    let result = [];
    let queues = this.kernel.config.dbOffloadQueues;

    for (let modelName in queues) {
      if (!queues.hasOwnProperty(modelName)) {
        continue;
      }

      let queueConfig = queues[modelName];
      let name = queueConfig.name;
      let url = queueConfig.url;
      let region = this._getRegionFromSqsQueueUrl(url);
      let sqs = new AWS.SQS({region,});

      result.push({name, url, region, sqs,});
    }

    return result;
  }
}
