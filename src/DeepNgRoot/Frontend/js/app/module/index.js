'use strict';
'format es6';

import moduleName from '../name';
import {registerModule} from './ng-module';
import {Run} from './ng-run';
import {Config} from './ng-config';

export function registerModules(moduleNames) {
  registerModule(moduleNames);

  let kernel = DeepFramework.Kernel;
  angular.module(moduleName).run(['$rootScope', (...args) => {
    return new Run(...args);
  },
  ])
  .config(['$locationProvider', function(...args) {
    return new Config(kernel.isLocalhost, kernel.config.globals.engine.ngRewrite, ...args);
  },
  ]);
}

registerModules();

