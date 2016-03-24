/**
 * Created by CCristi <ccovali@mitocgroup.com> on 3/22/16.
 */

'use strict';

import {ESDriver} from './Driver/ESDriver';

/**
 * Async Config
 */
export class AsyncConfig {
  /**
   * @type {Object[]}
   */
  static get CONFIG_DRIVERS() {
    return [
      ESDriver,
    ];
  };

  /**
   * @param {{describe: Function, _appConfig: Object}} serviceDescriber
   */
  constructor(serviceDescriber) {
    this._describer = serviceDescriber;
    this._ready = true;
  }

  /**
   * @param {Function} callback
   */
  generate(callback) {
    let asyncConfig = {};
    let appConfig = this._describer._appConfig;

    this._describer.describe((result) => {
      let servicesInfo = result.resources;

      AsyncConfig.CONFIG_DRIVERS.forEach((driverClass) => {
        let driver = new driverClass(appConfig, servicesInfo);

        asyncConfig[driver.configKey()] = driver.config();

        this._ready = this._ready && driver.ready;
      });

      callback(result.errors, asyncConfig);
    });
  }

  /**
   * @returns {Boolean}
   */
  get ready() {
    return this._ready;
  }
}
