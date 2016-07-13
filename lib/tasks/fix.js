/*eslint-env node*/

'use strict';

var join = require('path').join;
var eslint = require('../helpers/eslint');

module.exports = function() {
  var appDirectory = join(this.project.root, 'app');
  var testDirectory = join(this.project.root, 'tests');

  var ui = this.ui;

  ui.writeLine('');
  ui.startProgress('Fixing code...');

  return eslint.run([appDirectory, testDirectory], '--fix')
    .then(function() {
      ui.stopProgress();
    })
    .catch(function(stdout) {
      ui.stopProgress();

      stdout.trim().split('\n').forEach(function(line) {
        ui.writeLine(line);
      });

      return Promise.reject();
    });
};
