'use strict';

import moduleName from '../../../../Frontend/js/app/name';

describe('Directives', function() {

  var element;
  var compiledElement;
  var $compile;
  var $rootScope;
  var title;

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Check that title doesn\'t equal \'It works!\'', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<title update-title></title>')($rootScope);

    // fire all the watches, to see that title doesn't equal to 'It works!'
    $rootScope.$digest();

    // Check that the compiled element contains the templated content
    expect(element.html()).not.toContain('It works!');
  });
});
