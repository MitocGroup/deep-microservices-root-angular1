// THIS TEST WAS GENERATED AUTOMATICALLY ON Thu May 05 2016 16:19:05 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/scheduler/rule/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-scheduler-rule module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
