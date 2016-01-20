/**
 * Created by AlexanderC on 10/6/15.
 */

'use strict';

module.exports = function(callback) {
  var exec = require('child_process').exec;
  var path = require('path');
  var fs = require('fs');
  var os = require('os');

  var DEEP = 'deep-framework';
  var BROWSER_BUILD = 'browser/framework.js';
  var FW_DEP_PATH = 'Frontend/js/lib/deep-framework.js';

  console.log('Checking for ' + DEEP + ' globally');

  var cmd = 'npm list -g --depth 1 ' + DEEP + ' > /dev/null 2>&1' +
    '|| npm install -g ' + DEEP + ' --production --loglevel warn &>/dev/null';

  //remove redirection stdout and stderr for Windows
  if (os.platform().indexOf('win32') > -1 ||
    os.platform().indexOf('win64') > -1) {

    cmd = cmd.replace(/\s*>\s*\/dev\/null\s*2>\&1/gi, ' ');
    cmd = cmd.replace(/\&>\/dev\/null/gi, ' ');
  }

  var installation = exec(cmd, function(error) {
      if (error) {
        console.error('Error while installing ' + DEEP, error);
        callback();
        return;
      }

      exec('npm root -g', function(error, stdout) {
        if (error) {
          console.error('Error getting NPM root', error);
          callback();
          return;
        }

        //need to double check if it works for all
        var npmRoot = stdout.replace(/\s+/, '');
        var fw = path.join(npmRoot, DEEP);
        var browserFw = path.join(fw, BROWSER_BUILD);

        if (!fs.existsSync(browserFw)) {
          console.error('Missing browser version of ' + DEEP + ' in ' + browserFw);
          callback();
          return;
        }

        var fwDep = path.join(__dirname, FW_DEP_PATH);

        if (!fs.existsSync(fwDep)) {
          exec('cp ' + browserFw + ' ' + fwDep, function(error) {
            if (error) {
              console.error('Error while copying browser version of ' + DEEP, error);
              callback();
              return;
            }

            console.log(
              'Browser version of ' + DEEP +
              ' was successfully copied into ' + fwDep
            );
            callback();
          });
        } else {
          callback();
        }
      });
    }
  );

  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);
};
