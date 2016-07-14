/*eslint-env node*/

'use strict';

var join = require('path').join;
var pathToEslint = require('../helpers/path-to-eslint');
var asyncExec = require('../helpers/async-exec');

module.exports = function() {
  var appDirectory = join(this.project.root, 'app');
  var testDirectory = join(this.project.root, 'tests');

  var ui = this.ui;

  return pathToEslint()
    .then(function(eslint) {
      return asyncExec(eslint, ['--fix', appDirectory, testDirectory], 'Fixing code', ui);
    });
};
