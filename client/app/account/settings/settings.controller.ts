'use strict';

class SettingsController {

  errors;
  submitted: boolean;
  Auth;
  user;
  message: string;

  constructor(Auth) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'account.passwordSuccessfullyChanged';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'account.incorrectPassword';
          this.message = '';
        });
    }
  }
}

angular.module('gatewayApp')
  .controller('SettingsController', SettingsController);
