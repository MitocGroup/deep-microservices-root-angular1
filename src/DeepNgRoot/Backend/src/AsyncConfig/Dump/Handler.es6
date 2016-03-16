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
  }

  /**
   * @param request
   */
  handle(request) {
    let logger = this.kernel.get('log');
    let sharedFs = this.kernel.get('fs').shared();

    this._describer = new ServicesDescriber(
      new Property('/', this._getPropertyConfig()),
      this.kernel.config
    );

    this._describer.describe((result) => {
      //@todo - do not disable this scheduled lambda if there are any errors ...
      if (Object.keys(result.errors).length !== 0 ) {
        logger.warn(`Error on describing ${ServicesDescriber.SERVICES.join(', ')} services.`, result.errors);
      }

      let asyncConfig = this._generateAsyncConfig(result.resources);

      sharedFs.writeFile(this.kernel.constructor.ASYNC_CONFIG_FILE, JSON.stringify(asyncConfig), (error) => {
        if (error) {
          throw new DeepFramework.Core.Exception(
            `Error on persisting ${this.kernel.constructor.ASYNC_CONFIG_FILE} file in shared FS. ${error}`
          );
        }

        return this.createResponse(asyncConfig).send();
      });
    });
  }

  /**
   * @param {Object} servicesInfo
   * @private
   */
  _generateAsyncConfig(servicesInfo) {
    let appConfig = this.kernel.config;
    let asyncConfig = {};

    // lookup for ES endpoints
    for (let domainKey in appConfig.searchDomains) {
      if (!appConfig.searchDomains.hasOwnProperty(domainKey)) {
        continue;
      }

      asyncConfig.searchDomains = {};

      let domain = appConfig.searchDomains[domainKey];

      if (domain.type === DeepFramework.Core.AWS.Service.ELASTIC_SEARCH) {
        let esAsyncConfig = servicesInfo.ES || {};

        if (esAsyncConfig.hasOwnProperty(domain.name)) {
          let asyncEs = esAsyncConfig[domain.name];

          asyncConfig.searchDomains[domainKey] = {
            url: asyncEs.Endpoint,
          }
        }
      }
    }

    return asyncConfig;
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