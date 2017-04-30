'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/ddb-eventual-consistency/listen-queues/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-ddb-eventual-consistency-listen-queues module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
