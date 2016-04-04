'use strict';
'format es6';

export class Config {
  /**
   *
   * @param {Boolean} isLocalhost
   * @param {String} ngRewrite
   * @param {Object} $locationProvider
   */
  constructor(isLocalhost, ngRewrite, $locationProvider) {
    let isS3Website = /\.amazonaws\.com$/i.test(window.location.hostname);

    if (!isS3Website && !isLocalhost && ngRewrite === '/') {
      $locationProvider.html5Mode(true);
    }
  }
}
