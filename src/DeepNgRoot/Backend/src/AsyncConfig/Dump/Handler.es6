/**
 * Created by mgoria on 3/11/16.
 */

'use strict';

import AWS from 'aws-sdk';
import DeepFramework from 'deep-framework';
import {Property_Instance as Property} from 'deep-package-manager';
import {Provisioning_Describer as ServicesDescriber} from 'deep-package-manager';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);

    this._describer = new ServicesDescriber(
      new Property('/', this._getPropertyConfig()),
      this.kernel.config
    );
  }

  /**
   * @TBD
   *
   * @param request
   */
  handle(request) {
    this._describer.describe((result) => {
      return this.createResponse(result).send();
    });
  }

  /**
   * @returns {Object}
   * @private
   */
  _getPropertyConfig() {
    return {
      env: this.kernel.config.env,
      appIdentifier: this.kernel.config.appIdentifier,
      awsAccountId: this.kernel.config.awsAccountId,
      aws: {
        accessKeyId: AWS.config.credentials.accessKeyId,
        secretAccessKey: '',
        sessionToken: AWS.config.credentials.sessionToken,
        region: AWS.config.region
      }
    };
  }
}