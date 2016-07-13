/*eslint-env node*/

'use strict';

var exec = require('child_process').exec;

/**
 * Async Exec
 *
 * Execute a shell command through a Promise
 */
module.exports = function asyncExec(command) {
  return new Promise(function(resolve, reject) {
    exec(command, function(error, stdout) {
      if (error) {
        reject(stdout);
      } else {
        resolve(stdout);
      }
    });
  });
};
