'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'navbar.home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  isLoggedIn : boolean;
  isAdmin : boolean;
  getCurrentUser;

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('gatewayApp')
  .controller('NavbarController', NavbarController);
