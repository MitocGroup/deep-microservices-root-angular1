'use strict';
'format es6';

export class Config {
  /**
   *
   * @param {Boolean} isLocalhost
   * @param {String} env
   * @param {String} ngRewrite
   * @param {Object} $locationProvider
   * @param {Object} $compileProvider
   */
  constructor(isLocalhost, env, ngRewrite, $locationProvider, $compileProvider) {
    let isS3Website = /\.amazonaws\.com$/i.test(window.location.hostname);

    if (!isS3Website && !isLocalhost && ngRewrite === '/') {
      $locationProvider.html5Mode(true);
    }

    if (env === 'prod' || env === 'stage') {
      $compileProvider.debugInfoEnabled(false);
    }
  }
}
