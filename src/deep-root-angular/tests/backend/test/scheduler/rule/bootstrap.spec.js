'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/scheduler/rule/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-scheduler-rule module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
