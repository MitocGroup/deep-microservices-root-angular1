/* global System */
'use strict';
'format es6';

/* eslint callback-return: [0] */

var deepKernel = DeepFramework.Kernel;

System.config({
  defaultJSExtensions: true,
});

deepKernel.bootstrap(function() {
  var bootstrapScripts = deepKernel.get('deep_frontend_bootstrap_vector');
  var scripts = [];
  var mNames = [];
  var modules = [];
  var config = [];
  var loadFirst = [];

  bootstrapScripts.map(function(m) {
    scripts.push(Promise.resolve(System.import(m)).then(function(module) {
      if (!module || !module.hasOwnProperty('default')) {
        return;
      }
      
      // collect angular modules
      var moduleName = module.default.name;
      mNames.push(moduleName);
      modules.push(module.default);

      if (typeof module.loadFirst === 'function') {
        loadFirst.push(module.loadFirst);
      }

      if (typeof module.configLoad === 'function') {
        config.push(module.configLoad);
      }
    }));
  });

  function afterAngularLoad() {
    System.set('angular-ui-router', System.newModule(angular.module('ui.router')));
    var moduleScripts = [];

    for (var callback of modules) {
      if (typeof callback === 'function') {
        moduleScripts.push(Promise.resolve(callback()));
      }
    }

    Promise.all(moduleScripts).then(function() {
      System.import('/js/app/module/index').then(function(m) {
        m.registerModules(mNames);
        System.import('/js/app/index').then(function(m) {
          m.bootstrap();
        }).catch(function(reason) {
          deepKernel.container.get('log').log(reason);
        });
      });
    });
  }

  function afterLoadFirst() {
    System.import('/js/lib/css.js').then(function(script) {
      System.set('css', System.newModule(script));
      System.import('/js/lib/angular.js').then(function(angular) {
        System.set('angular', System.newModule(angular));
        System.import('/js/lib/angular-ui-router.js').then(afterAngularLoad);
      });
    });
  }

  function afterConfigLoad() {
    var loadFirstPromise = [];

    for (var callback of loadFirst) {
      if (typeof callback === 'function') {
        loadFirstPromise.push(Promise.resolve(callback()));
      }
    }

    Promise.all(loadFirstPromise).then(afterLoadFirst);
  }

  function afterBootstrapLoad() {
    var configPromise = [];

    for (var callback of config) {
      if (typeof callback === 'function') {
        configPromise.push(Promise.resolve(callback()));
      }
    }

    Promise.all(configPromise).then(afterConfigLoad);
  }

  Promise.all(scripts).then(afterBootstrapLoad);
});
