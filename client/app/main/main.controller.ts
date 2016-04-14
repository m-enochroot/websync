'use strict';

(function() {

  class MainController {

    constructor($http, private $scope: ng.IScope, socket, Upload, $timeout, $location, Auth) {

      this.$http = $http;
      this.Upload = Upload;
      this.$timeout = $timeout;
      this.$location = $location;

      this.host = $location.host();

      this.port = $location.port();

      this.watchForFilesDropping();
      this.uploadInProgress = [];
      this.Auth = Auth;

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data.map( thing => {
          console.log(thing);
          thing.urlScheme = 'gateway://' + this.host + ':' + this.port + '/uploads/' + thing.code;
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
    private $location;
    private host;
    private port;
    private uploadInProgress;
    private Auth;


    log = '';
    awesomeThings = [];
    files = [];
    file = null;
    newThing = null;

    private setUploadProgress(filename, progress) {
      this.uploadInProgress = this.uploadInProgress.map((item) => {
        if ( item.file === filename) {
         item.progress = progress;
        }
        return item;
      });
    }

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
            var myUpload = {
              file: file.name,
              progress: 0
            };
            var uploadIndex = this.uploadInProgress.push(myUpload);

            var user = this.Auth.getCurrentUser();

            this.Upload.upload({
              url: '/upload',
              data: {
                username: user.name,
                file: file
              }
            }).then((resp) => {
              this.$timeout(() => {
                myUpload.progress = 100;
                this.uploadInProgress = this.uploadInProgress.filter((item) => {
	                return item.progress !== 100;
                });
                this.log = 'file: ' +
                  resp.config.data.file.name +
                  ', Response: ' + JSON.stringify(resp.data) +
                  '\n' + this.log;
              });
            }, null, (evt) => {

              var progressPercentage = Math.round((100.0 * evt.loaded) / evt.total);
              var dataFilename = evt.config.data.file.name;

              this.setUploadProgress(dataFilename, progressPercentage);
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
