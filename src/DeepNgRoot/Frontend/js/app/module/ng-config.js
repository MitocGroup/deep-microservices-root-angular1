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
    if (!isLocalhost && ngRewrite === '/') {
      $locationProvider.html5Mode(true);
    }
  }
}
