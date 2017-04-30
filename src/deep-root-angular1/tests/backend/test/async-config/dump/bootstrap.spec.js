'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/async-config/dump/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-async-config-dump module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
