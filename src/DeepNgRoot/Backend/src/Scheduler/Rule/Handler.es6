/**
 * Created by acucer on 3/17/16.
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
   * @param {{effect:*,lambdaName:*}} payload
   *
   * @todo: Make sure a scheduled Lambda name provided
   */
  handle(payload) {
    this._doAction(payload.effect, payload.lambdaName);
  }

  /**
   * @param {String} effect
   * @param {String} rule
   * @private
   */
  _doAction(effect, rule) {
    let cloudWatchEvents = new AWS.CloudWatchEvents();

    cloudWatchEvents[`${effect}Rule`]({Name: rule,}, (error) => {
      if (error) {
        throw new DeepFramework.Core.Exception(
          `Error ${effect}ing Schedule Rule '${rule}': ${error}`
        );
      }

      this.createResponse({rule}).send();
    });
  }

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.object().keys({
        effect: Joi.string().required().allow(['enable', 'disable']),
        lambdaName: Joi.string().required(),
      });
    };
  }
}
