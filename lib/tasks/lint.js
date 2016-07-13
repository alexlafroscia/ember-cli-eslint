/*eslint-env node*/

'use strict';

var join = require('path').join;
var exec = require('child_process').exec;

function asyncExec(command) {
  return new Promise(function(resolve, reject) {
    exec(command, function(error, stdout) {
      if (error) {
        reject(stdout);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = function() {
  var appDirectory = join(this.project.root, 'app');
  var testDirectory = join(this.project.root, 'tests');

  var ui = this.ui;

  ui.writeLine('');
  ui.startProgress('Running ESLint...');

  return asyncExec('npm bin')
    .then(function(location) {
      return join(location.trim(), 'eslint');
    })
    .then(function(command) {
      return asyncExec([command, appDirectory, testDirectory].join(' '));
    })
    .then(function() {
      ui.stopProgress();
    })
    .catch(function(stdout) {
      stdout.trim().split('\n').forEach(function(line) {
        ui.writeLine(line);
      });

      ui.stopProgress();

      return Promise.reject();
    });
};
