/**
 * Created by AlexanderC on 10/6/15.
 */

var exports = module.exports = function() {
  var DEEP = 'deep-framework';
  var BROWSER_BUILD = 'browser/framework.js';
  var FW_DEP_PATH = 'DeepNgRoot/Frontend/js/lib/deep-framework.js';

  var exec = require("child_process").exec;
  var path = require('path');
  var fs = require('fs');

  console.log('- Checking for ' + DEEP + ' globally');

  var installation = exec(
    'npm info -g ' + DEEP + ' --loglevel silent > /dev/null || npm install -g ' + DEEP + ' --production --loglevel warn',
    function(error, stdout, stderr) {
      if (error) {
        console.error('Error while installing ' + DEEP, error);
        process.exit(1);
      }

      exec('npm root -g', function(error, stdout, stderr) {
        if (error) {
          console.error('Error getting NPM root', error);
          process.exit(1);
        }

        var npmRoot = stdout.replace(/\s+/, '');
        var fw = path.join(npmRoot, DEEP);
        var browserFw = path.join(fw, BROWSER_BUILD);

        if (!fs.existsSync(browserFw)) {
          console.error('Missing browser version of ' + DEEP + ' in ' + browserFw);
          process.exit(1);
        }

        var fwDep = path.join(__dirname, FW_DEP_PATH);

        exec('rm -f ' + fwDep + '; cp ' + browserFw + ' ' + fwDep, function(error, stdout, stderr) {
          if (error) {
            console.error('Error while copying browser version of ' + DEEP, error);
            process.exit(1);
          }

          console.log('Browser version of ' + DEEP + ' was successfully copied into ' + fwDep);
        });
      });
    }
  );

  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);
};
