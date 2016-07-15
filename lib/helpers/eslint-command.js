/*eslint-env node*/

'use strict';

var spawn = require('child_process').spawnSync;
var join = require('path').join;

var pathToEslint = join(require.resolve('eslint'), '../../bin/eslint.js');

/**
 * Run an ESLint command, piping the `stdout` to the Ember CLI UI
 *
 * @param {string} command
 * @param {string[]} arg
 * @param {string} spinnerLabel
 * @param {EmberCLI.UI} ui
 */
module.exports = function eslintCommand(args, spinnerLabel, ui) {
  var options = {};

  if (!args) {
    throw new Error('You must provide an arguments array');
  }

  // Set up the loading spinner
  ui.writeLine('');
  ui.startProgress(spinnerLabel);
  options.stdio = [ui.inputStream, ui.actualOutputStream, ui.errorStream]

  return new Promise(function(resolve, reject) {
    var result = spawn(pathToEslint, args, options);

    ui.stopProgress();

    if (result.status === 0) {
      resolve();
    } else {
      reject(result.error);
    }
  });
};
