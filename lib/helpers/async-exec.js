/*eslint-env node*/

'use strict';

var spawn = require('child_process').spawnSync;

/**
 * Async Exec
 *
 * Execute a shell command through a Promise
 *
 * Can be given an Ember UI object to print the output to
 *
 * @param {string} command
 * @param {string[]} arg
 * @param {string} [spinnerLabel]
 * @param {EmberCLI.UI} ui
 */
module.exports = function asyncExec(command, args, spinnerLabel, ui) {
  var options = {};

  if (!command) {
    throw new Error('You must provide a command to run');
  }

  if (!args) {
    throw new Error('You must provide an arguments array');
  }

  // Set up the loading spinner
  if (ui) {
    ui.writeLine('');
    ui.startProgress(spinnerLabel);
    options.stdio = [ui.inputStream, ui.actualOutputStream, ui.errorStream]
  }

  return new Promise(function(resolve, reject) {
    var result = spawn(command, args, options);

    if (ui) {
      ui.stopProgress();
    }

    if (result.status === 0) {
      var stdout = (result.stdout) ? result.stdout.toString() : '';

      resolve(stdout);
    } else {
      reject(result.error);
    }
  });
};
