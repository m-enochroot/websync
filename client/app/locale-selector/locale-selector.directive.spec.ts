'use strict';

describe('Directive: localeSelector', function () {

  // load the directive's module and view
  beforeEach(module('gatewayApp'));
  beforeEach(module('app/locale-selector/locale-selector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<locale-selector></locale-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the localeSelector directive');
  }));
});
