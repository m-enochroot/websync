'use strict';

angular.module('gatewayApp')
  .directive('localeSelector', function ($translate) {
        return {
            restrict: 'C',
            replace: true,
            templateUrl: 'app/locale-selector/locale-selector.html',
            link: function(scope : any, elem, attrs) {

                scope.locales = {
                  'en_EN' : {
                    label: 'languageNames.en',
                    code: 'en_EN'
                  },
                  'es_ES' : {
                    label: 'languageNames.es',
                    code: 'es_ES'
                  },
                  'fr_FR' : {
                    label: 'languageNames.fr',
                    code: 'fr_FR'
                  }
                };

                // Get active locale even if not loaded yet:
                var locale = $translate.proposedLanguage();
                if (!locale) {
                  locale = $translate.resolveClientLocale();
                }
                scope.selectLocale = scope.locales[locale].label;

                scope.setLocale = function($item) {
                    $translate.use($item.key);
                };
            }
        };
    });
