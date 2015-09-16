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
  map: {},
});
