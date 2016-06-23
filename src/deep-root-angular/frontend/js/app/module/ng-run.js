'use strict';
'format es6';

export class Run {
  /**
   * @param $rootScope
   */
  constructor($rootScope) {
    $rootScope.$on('$viewContentLoaded', () => {
      $rootScope.loaded = true;
    });

    let globalConfig = DeepFramework.Kernel.config.globals;

    if (globalConfig.serviceWorker && globalConfig.serviceWorker.cache.enabled && window.deepSwInstance) {
      let observer = new MutationObserver(() => {
        window.deepSwInstance.postMessage({
          key: document.URL.replace(/#.+$/, ''),
          value: document.querySelector('html').innerHTML, // @todo: find a way to cache only ui-router part
        });
      });

      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    }
  }
}
