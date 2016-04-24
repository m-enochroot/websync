'use strict';

angular.module('gatewayApp')
  .directive('footer', function (appPackage) {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function(scope : any, element) {
        element.addClass('footer');
        scope.version = appPackage.version;
      }
    };
  });
