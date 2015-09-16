'use strict';

// Karma configuration
// Generated on Fri Aug 14 2015 12:41:04 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'Frontend/js/lib/angular.js',
      'Frontend/js/lib/angular-ui-router.js',
      //'Frontend/js/lib/deep-framework.js',
      'Frontend/js/lib/system.js',
      //'Frontend/js/lib/system-polyfills.js',
      //'Frontend/js/lib/traceur.min.js',

      //load the polyfill in your Karma, needed since SystemJS depends on Function.bind(), which is not supported in PhantomJS:
      //'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',

      //mocking DeepFramework
      //'Tests/Frontend/lib/DeepFramework.js',
      //'Tests/Frontend/mock/lib/DeepFramework.js',
      //{pattern: 'Tests/Frontend/mock/data/*.json', watched: true, served: true, included: false,},

      //include the directory where directive templates are stored.
      //'**/views/directives/*.html',
    ],

    // jspm configuration
    //jspm: {
    //  config: 'Tests/Frontend/config.test.js',
    //  packages: 'Tests/Frontend/vendor/',
    //  useBundles: false,
    //  paths: {
    //    '*': '*.js',
    //    'github:*': 'Tests/Frontend/vendor/github/*.js',
    //    'npm:*': 'Tests/Frontend/vendor/npm/*.js',
    //  },
    //  loadFiles: [
    //    'Tests/Frontend/angular/**/*.spec.js',
    //    'Frontend/js/app/angular/index.js',
    //  ],
    //  serveFiles: [
    //    'Frontend/js/app/**/*.js',
    //  ],
    //},

    proxies: {
    },

    client: {
      captureConsole: true,
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'Frontend/js/app/angular/**/*.js': ['babel','coverage'],
      'Tests/Frontend/angular/**/*.spec.js': ['babel'],
      '**/views/directives/*.html': 'ng-html2js',
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        modules: 'system',
      },
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
    },

    plugins: [
      'karma-babel-preprocessor',
      'karma-jasmine',
      'karma-coverage',
      'karma-jspm',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-verbose-reporter',
      'karma-ng-html2js-preprocessor',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //verbose
    //progress
    reporters: ['verbose', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          type: 'json',
          dir: 'Tests/Frontend/coverage/',
        },
        {
          type: 'lcov',
          dir: 'Tests/Frontend/coverage/',
        },
      ],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

  });
};