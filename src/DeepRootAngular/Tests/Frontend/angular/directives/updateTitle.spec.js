'use strict';

import moduleName from '../../../../Frontend/js/app/name';

describe('Directives', function() {

  var compile, scope, directiveElem;

  beforeEach(function() {
    angular.module(moduleName);

    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement() {
    var element = angular.element('<title update-title></title>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  it('should have title element', function() {
    var titleElement = directiveElem.find('title');
    expect(titleElement).toBeDefined();
    expect(titleElement.html()).not.toContain('It works!');
  });
});
