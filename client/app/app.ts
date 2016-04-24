'use strict';

angular.module('gatewayApp', [
  'gatewayApp.auth',
  'gatewayApp.admin',
  'gatewayApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'validation.match',
  'ngFileUpload',
  'ja.qr',
  'monospaced.qrcode',
  'angular-svg-round-progressbar',
  'pascalprecht.translate'
])
  .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $translateProvider.useCookieStorage();
    $translateProvider.useUrlLoader('/api/lang');
    $translateProvider.preferredLanguage('en');

  });
