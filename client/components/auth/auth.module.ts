'use strict';

angular.module('gatewayApp.auth', [
  'gatewayApp.constants',
  'gatewayApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
