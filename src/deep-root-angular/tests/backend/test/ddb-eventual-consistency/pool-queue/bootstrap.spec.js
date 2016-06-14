// THIS TEST WAS GENERATED AUTOMATICALLY ON Mon Jun 13 2016 16:56:19 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/ddb-eventual-consistency/pool-queue/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-ddb-eventual-consistency-pool-queue module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
