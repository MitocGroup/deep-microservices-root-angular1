/**
 * Created by AlexanderC on 10/6/15.
 */

'use strict';

var exports = module.exports = function (callback) {
  var exec = require('child_process').exec;
  var path = require('path');
  var fs = require('fs');

  var DEEP_TEMP = path.join(
    __dirname, './../../../deep-framework/src/deep-framework'
  );
  console.log('DEEP_TEMP: ', DEEP_TEMP);

  var DEEP = 'deep-framework';
  var BROWSER_BUILD = 'browser/framework.js';
  var FW_DEP_PATH = 'Frontend/js/lib/deep-framework.js';

  console.log('Checking for ' + DEEP + ' globally');

  var installation = exec(
    //'npm list -g --depth 1 ' + DEEP + ' > /dev/null 2>&1
    // || npm install -g ' + DEEP + ' --production --loglevel warn &>/dev/null',
    'npm list -g --depth 1 ' + DEEP_TEMP +
    ' || npm install -g ' + DEEP_TEMP + ' --production --loglevel warn',
    function (error) {
      if (error) {
        console.error('Error while installing ' + DEEP, error);
        callback();
        return;
      }

      console.log('No errors, will run "npm root -g"');

      exec('npm root -g', function (error, stdout) {
        if (error) {
          console.error('Error getting NPM root', error);
          callback();
          return;
        }

        console.log('No errors after getting NPM root: ', stdout);

        //need to double check if it works for all
        var npmRoot = stdout.replace(/\s+/, '');
        console.log('npmRoot: ', npmRoot);
        var fw = path.join(npmRoot, DEEP);
        console.log('fw: ', fw);
        var browserFw = path.join(fw, BROWSER_BUILD);

        if (!fs.existsSync(browserFw)) {
          console.error('Missing browser version of ' + DEEP + ' in ' + browserFw);
          callback();
          return;
        }

        console.log('Exists browserFw: ', browserFw);

        var fwDep = path.join(__dirname, FW_DEP_PATH);
        console.log('fwDep: ', fwDep);
        if (!fs.existsSync(fwDep)) {
          exec('cp ' + browserFw + ' ' + fwDep, function (error) {
            if (error) {
              console.error('Error while copying browser version of ' + DEEP, error);
              callback();
              return;
            }

            console.log('Browser version of ' + DEEP + ' was successfully copied into ' + fwDep);

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
