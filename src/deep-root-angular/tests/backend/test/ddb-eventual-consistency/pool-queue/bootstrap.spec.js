'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/ddb-eventual-consistency/pool-queue/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-ddb-eventual-consistency-pool-queue module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
