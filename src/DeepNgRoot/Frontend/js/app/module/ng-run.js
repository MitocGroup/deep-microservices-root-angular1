'use strict';
'format es6';

export class Run {
  /**
   *
   * @param $rootScope
   */
  constructor($rootScope) {
    $rootScope.$on('$viewContentLoaded', () => {
      $rootScope.loaded = true;
    });
  }
}
