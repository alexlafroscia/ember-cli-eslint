/*eslint-env node*/

'use strict';

var join = require('path').join;
var asyncExec = require('./async-exec');

/**
 * Get the path to the ESLint executable in the dependencies
 *
 * @returns {Promise->String} the path to the ESLint executable
 */
module.exports = function() {
  return asyncExec('npm', ['bin'])
    .then(function(location) {
      return join(
        location.trim(), '../ember-cli-eslint/node_modules/.bin/eslint'
      );
    });
};
