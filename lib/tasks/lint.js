/*eslint-env node*/

'use strict';

var join = require('path').join;
var eslintCommand = require('../helpers/eslint-command');

module.exports = function() {
  var appDirectory = join(this.project.root, 'app');
  var testDirectory = join(this.project.root, 'tests');

  return eslintCommand([appDirectory, testDirectory], 'Running ESLint', this.ui);
};
