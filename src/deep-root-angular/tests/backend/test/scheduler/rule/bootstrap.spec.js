// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue Jun 07 2016 01:02:03 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/scheduler/rule/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-scheduler-rule module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
