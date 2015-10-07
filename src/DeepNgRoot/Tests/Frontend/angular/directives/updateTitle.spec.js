'use strict';

import moduleName from '../../../../Frontend/js/app/name';

describe('Directives', function() {

  var $compile;
  var $rootScope;

  beforeEach(function() {
    angular.mock.module(moduleName);
  });

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Positive suite', function() {
    //it('update-title directive is implemented', function() {
    //});
  });

});
