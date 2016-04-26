'use strict';

angular.module('gatewayApp')
  .directive('localeSelector', function ($translate, moment) {
        return {
            restrict: 'C',
            replace: true,
            templateUrl: 'app/locale-selector/locale-selector.html',
            link: function(scope : any, elem, attrs) {

                scope.locales = {
                  'en_EN' : {
                    label: 'languageNames.en',
                    code: 'en_EN',
                    shortCode: 'en'
                  },
                  'es_ES' : {
                    label: 'languageNames.es',
                    code: 'es_ES',
                    shortCode: 'es'
                  },
                  'fr_FR' : {
                    label: 'languageNames.fr',
                    code: 'fr_FR',
                    shortCode: 'fr'
                  }
                };

                // Get active locale even if not loaded yet:
                var locale = $translate.proposedLanguage();
                if (!locale) {
                  locale = $translate.resolveClientLocale();
                }
                scope.selectLocale = scope.locales[locale].label;

                $translate.use(locale);
                moment.locale(scope.locales[locale].shortCode);

                scope.setLocale = function($item) {
                    $translate.use($item.key);
                    moment.locale($item.value.shortCode);
                };

            }
        };
    });
