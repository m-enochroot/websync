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
  'validation.match',
  'ngFileUpload',
  'ja.qr',
  'monospaced.qrcode',
  'angular-svg-round-progressbar'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
