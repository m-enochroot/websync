'use strict';

(function() {

  class MainController {

    constructor($http, private $scope: ng.IScope, socket, Upload, $timeout) {

      this.$http = $http;
      this.Upload = Upload;
      this.$timeout = $timeout;

      this.watchForFilesDropping();

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data.map( thing => {
          thing.urlScheme = 'gateway://localhost:9000/uploads/' + thing.code;
          return thing;
        });

        socket.syncUpdates('thing', this.awesomeThings);
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    private $http;
    private Upload;
    private $timeout;

    log = '';
    awesomeThings = [];
    files = [];
    file = null;
    newThing = null;

    private watchForFilesDropping() {

      this.$scope.$watch(() => this.files, (newFiles) => {
        this.uploadFiles(newFiles);
      });

      this.$scope.$watch(() => this.file, (newFile) => {
        if (newFile != null) {
          this.files = [newFile];
        }
      });


    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', { name: this.newThing });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }


    private uploadFiles(files) {

      if (files && files.length) {

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            this.Upload.upload({
              url: '/upload',
              data: {
                username: 'admin',
                file: file
              }
            }).then((resp) => {
              this.$timeout(() => {
                this.log = 'file: ' +
                  resp.config.data.file.name +
                  ', Response: ' + JSON.stringify(resp.data) +
                  '\n' + this.log;
              });
            }, null, (evt) => {

              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              this.log = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' + this.log;
            });
          }
        }
      }
    }

  }

  angular.module('gatewayApp')
    .controller('MainController', MainController);

})();
