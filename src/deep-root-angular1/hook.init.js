'use strict';

const path = require('path');
const { spawn } = require('child_process');

module.exports = function(callback) {
  let installation = null;
  let bashBin = process.env.SHELL || 'bash';

  if (!/bash/i.test(bashBin)) {
    bashBin = 'bash';
  }

  try {
    installation = spawn(
      bashBin, [
        path.join(__dirname, 'framework.sh'),
      ]
    );
  } catch (error) {
    console.error(error);
    return;
  }

  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);

  installation.on('error', function(error) {
    console.error(error);
  });

  installation.on('close', function(code) {
    if (code !== 0) {
      console.error('Framework installation failed (exit with code ' + code + ')');
    }

    callback();
  });
};
