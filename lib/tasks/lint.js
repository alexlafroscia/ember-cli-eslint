/*eslint-env node*/

'use strict';

var join = require('path').join;
var eslint = require('../helpers/eslint');

module.exports = function() {
  var appDirectory = join(this.project.root, 'app');
  var testDirectory = join(this.project.root, 'tests');

  var ui = this.ui;

  ui.writeLine('');
  ui.startProgress('Running ESLint...');

  return eslint.run([appDirectory, testDirectory])
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
