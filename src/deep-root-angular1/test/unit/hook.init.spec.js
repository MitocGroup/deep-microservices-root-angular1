'use strict';

const chai = require('chai');
const hookInit = require('../../hook.init');

describe('Check hook.init', () => {

  it('Test hook.init to be executable', done => {
    let callback = sinon.spy();

    hookInit(function() {
      done();
    });
  });
});
