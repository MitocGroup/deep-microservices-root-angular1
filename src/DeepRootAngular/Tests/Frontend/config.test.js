System.config({
  defaultJSExtensions: true,
  transpiler: 'babel',
  paths: {
    'github:*': 'Frontend/vendor/github/*',
    'npm:*': 'Frontend/vendor/npm/*'
  },

  map: {
    'angular': 'github:angular/bower-angular@1.4.0',
    'angular-mocks': 'github:angular/bower-angular-mocks@1.4.4',
    'angular-ui-router': 'github:angular-ui/ui-router@0.2.15',
    'babel': 'npm:babel-core@5.8.24',
    'babel-runtime': 'npm:babel-runtime@5.8.24',
    'core-js': 'npm:core-js@0.9.18',
    'es5-shim': 'github:es-shims/es5-shim@4.5.8',
    'es6-shim': 'github:es-shims/es6-shim@0.32.3',
    'github:angular-ui/ui-router@0.2.15': {
      'angular': 'github:angular/bower-angular@1.4.0'
    },
    'github:angular/bower-angular-mocks@1.4.4': {
      'angular': 'github:angular/bower-angular@1.4.0'
    },
    'github:jspm/nodelibs-assert@0.1.0': {
      'assert': 'npm:assert@1.3.0'
    },
    'github:jspm/nodelibs-process@0.1.2': {
      'process': 'npm:process@0.11.2'
    },
    'github:jspm/nodelibs-util@0.1.0': {
      'util': 'npm:util@0.10.3'
    },
    'npm:assert@1.3.0': {
      'util': 'npm:util@0.10.3'
    },
    'npm:babel-runtime@5.8.24': {
      'process': 'github:jspm/nodelibs-process@0.1.2'
    },
    'npm:core-js@0.9.18': {
      'fs': 'github:jspm/nodelibs-fs@0.1.2',
      'process': 'github:jspm/nodelibs-process@0.1.2',
      'systemjs-json': 'github:systemjs/plugin-json@0.1.2'
    },
    'npm:inherits@2.0.1': {
      'util': 'github:jspm/nodelibs-util@0.1.0'
    },
    'npm:process@0.11.2': {
      'assert': 'github:jspm/nodelibs-assert@0.1.0'
    },
    'npm:util@0.10.3': {
      'inherits': 'npm:inherits@2.0.1',
      'process': 'github:jspm/nodelibs-process@0.1.2'
    }
  }
});
