'use strict';
'format es6';

import moduleName from '../name';
import {registerModule} from './ng-module';
import {Run} from './ng-run';

export function registerModules(moduleNames) {
  registerModule(moduleNames);
  angular.module(moduleName).run(['$rootScope', (...args) => {
    return new Run(...args);
  },
  ]);
}

registerModules();

