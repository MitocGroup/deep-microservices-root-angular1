// THIS TEST WAS GENERATED AUTOMATICALLY ON Wed May 04 2016 19:22:08 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/AsyncConfig/Dump/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in deep-system-async-config-dump module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
