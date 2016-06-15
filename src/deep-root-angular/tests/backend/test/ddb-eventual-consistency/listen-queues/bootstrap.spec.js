// THIS TEST WAS GENERATED AUTOMATICALLY ON Wed Jun 15 2016 19:29:04 GMT-0400 (EDT)

'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/ddb-eventual-consistency/listen-queues/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-ddb-eventual-consistency-listen-queues module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
