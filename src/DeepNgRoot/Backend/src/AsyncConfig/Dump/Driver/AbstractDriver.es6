/**
 * Created by CCristi <ccovali@mitocgroup.com> on 3/22/16.
 */

'use strict';

import DeepFramework from 'deep-framework';

/**
 * Abstract Config Driver
 */
export class AbstractDriver extends DeepFramework.Core.OOP.Interface {
  /**
   * @param {Object} appConfig
   * @param {Object} servicesInfo
   */
  constructor(appConfig, servicesInfo) {
    super(['config', 'configKey', 'name']);

    this._appConfig = appConfig;
    this._servicesInfo = servicesInfo;
    this._ready = true;
  }

  /**
   * @returns {*}
   */
  get serviceInfo() {
    return this._servicesInfo[this.name()];
  }

  /**
   * @returns {Object}
   */
  get appConfig() {
    return this._appConfig;
  }

  /**
   * @returns {boolean}
   */
  get ready() {
    return this._ready;
  }
}
