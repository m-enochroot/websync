'use strict';

describe('Directive: localeSelector', function () {

  // load the directive's module and view
  beforeEach(module('gatewayApp'));
  beforeEach(module('app/locale-selector/locale-selector.html'));

  var element, scope;
  var $httpBackend

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    var i18nRes = {
        languageNames: {
            en: 'Language',
            es: 'Language',
            fr: 'Language'
        }
      };
    $httpBackend.expectGET(/\/api\/lang\?lang=(en|fr|es)/).respond(200, i18nRes);
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<locale-selector></locale-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('Language');
  }));
});
