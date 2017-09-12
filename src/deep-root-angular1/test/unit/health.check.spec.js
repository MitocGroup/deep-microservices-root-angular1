'use strict';

const chai = require('chai');

describe('Environment Health-check', () => {
  it('Test chai to be an object', () => {
     chai.expect(chai).to.be.an('object');
  });
});
