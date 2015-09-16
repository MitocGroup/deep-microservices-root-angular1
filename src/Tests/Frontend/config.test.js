System.config({
  defaultJSExtensions: true,
  transpiler: 'babel',
  babelOptions: {
    optional: ['runtime',],
  },
  paths: {
    '​*': '*​.js',
    'github:*': 'Frontend/js/lib/github/*',
    'npm:*': 'Frontend/js/lib/npm/*',
  },
  map: {
    'es5-shim': 'github:es-shims/es5-shim@4.1.6',
    'es6-shim': 'github:es-shims/es6-shim@0.27.1',
  },
});
