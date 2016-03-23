'use strict';
'format es6';

import moduleName from '../name';
import {registerModule} from './ng-module';
import {Run} from './ng-run';
import {Config} from './ng-config';

export function registerModules(moduleNames) {
  registerModule(moduleNames);

  angular.module(moduleName).run(['$rootScope', (...args) => {
    return new Run(...args);
  },
  ])
  .config(['$locationProvider', function(...args) {
    let kernel = DeepFramework.Kernel;
    let isLocalhost = kernel.isLocalhost;
    let ngRewrite = kernel.config.globals.engine.ngRewrite;

    return new Config(isLocalhost, ngRewrite, ...args);
  },
  ]);
}

registerModules();

