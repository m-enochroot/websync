// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/qrcode/lib/qrcode.js',
      'client/bower_components/angular-qr/src/angular-qr.js',
      'client/bower_components/qrcode-generator/js/qrcode.js',
      'client/bower_components/angular-qrcode/angular-qrcode.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-svg-round-progressbar/build/roundProgress.min.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/angular-translate/angular-translate.js',
      'client/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'client/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'client/bower_components/ui-select/dist/select.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/angular-moment/angular-moment.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'node_modules/socket.io-client/socket.io.js',
      '.tmp/app/app.js',
      '.tmp/{app,components}/**/*.module.js',
      '.tmp/{app,components}/**/*.js',
      '.tmp/test/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type: 'lcovonly', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/karma'
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
