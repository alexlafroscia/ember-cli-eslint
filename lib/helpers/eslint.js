/*eslint-env node*/

'use strict';

var join = require('path').join;
var asyncExec = require('./async-exec');

module.exports = {

  /**
   * Get the path to the ESLint executable in the dependencies
   *
   * @returns {Promise->String} the path to the ESLint executable
   */
  pathToExec: function() {
    return asyncExec('npm bin')
      .then(function(location) {
        return join(location.trim(), 'eslint');
      });
  },

  /**
   * Run an ESLint command
   *
   * @param {String[]} directories the directories (or files) to run on
   *
   * @returns {Promise->String} the results of the process (stdout)
   */
  run: function(directories) {
    directories = directories.join(' ');

    return this.pathToExec()
      .then(function(command) {
        return asyncExec([command, directories].join(' '));
      });
  }
};
