/**
 * Created by mgoria on 3/11/16.
 */

'use strict';

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
      new Property('/', this._getFakePropertyConfig()),
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
  _getFakePropertyConfig() {
    return {
      env: this.kernel.env,
      appIdentifier: '',
      awsAccountId: '',
      aws: {
        accessKeyId: '',
        secretAccessKey: '',
        region: this.kernel.awsRegion
      }
    };
  }
}