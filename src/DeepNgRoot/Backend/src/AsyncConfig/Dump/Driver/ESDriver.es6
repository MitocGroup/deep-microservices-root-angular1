/**
 * Created by CCristi <ccovali@mitocgroup.com> on 3/22/16.
 */

'use strict';

import {AbstractDriver} from './AbstractDriver';
import DeepFramework from 'deep-framework';

/**
 * Elastic Search Config Driver
 */
export class ESDriver extends AbstractDriver {
  /**
   * @param {*} args
   */
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {Object}
   */
  config() {
    let appConfig = this.appConfig;
    let esServiceInfo = this.serviceInfo || {};
    let esAsyncConfig = {};

    for (let domainKey in appConfig.searchDomains) {
      if (!appConfig.searchDomains.hasOwnProperty(domainKey)) {
        continue;
      }

      let domain = appConfig.searchDomains[domainKey];
      let esDomain = esServiceInfo[domain.name];

      if (domain.type === DeepFramework.Core.AWS.Service.ELASTIC_SEARCH) {
        if (!esDomain || !esDomain.Endpoint) {
          this._ready = false;

          continue;
        }

        esAsyncConfig[domainKey] = {
          url: esDomain.Endpoint,
        }
      }
    }

    return esAsyncConfig;
  }

  /**
   * @returns {String}
   */
  configKey() {
    return 'searchDomains';
  }

  /**
   * @returns {String}
   */
  name() {
    return 'ES';
  }
}
