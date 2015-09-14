'use strict';
'format es6';

import './dependencies';
import {registerModule} from './ng-module';

export function registerModules(moduleNames){
  registerModule(moduleNames);
}

registerModules();
