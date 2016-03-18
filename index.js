'use strict';
var path = require('path');
var eslint = require('broccoli-lint-eslint');
var jsStringEscape = require('js-string-escape');

module.exports = {
  name: 'ember-cli-eslint',

  // instructs ember-cli-qunit and ember-cli-mocha to
  // disable their lintTree implementations (which use JSHint)
  isDefaultJSLinter: true,

  included: function (app) {
    this._super.included.apply(this, arguments);
    this.jshintrc = app.options.jshintrc;
    this.options = app.options.eslint || {};
  },

  lintTree: function(type, tree) {
    var project = this.project;
    var testFramework = this.options.testFramework || 'qunit';

    var testGenerator = this.options.testGenerator;
    if (!testGenerator && testFramework === 'qunit') {
      testGenerator = qunitTestGenerator;
    } else if (!testGenerator && testFramework === 'mocha') {
      testGenerator = mochaTestGenerator;
    }

    return eslint(tree, {
      testGenerator: testGenerator || function(relativePath, errors) {
        if (!project.generateTestFile) {
          // Empty test generator. The reason we do that is that `lintTree`
          // will merge the returned tree with the `tests` directory anyway,
          // so we minimize the damage by returning empty files instead of
          // duplicating app tree.
          return '';
        }

        var passed = !errors || errors.length === 0;

        if (errors) {
          errors = jsStringEscape('\n' + render(errors));
        }

        return project.generateTestFile('ESLint - ' + relativePath, [{
          name: 'should pass ESLint',
          passed: passed,
          errorMessage: relativePath + ' should pass ESLint.' + errors
        }]);
      }
    });
  }
};

function qunitTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { module, test } from 'qunit';\n" +
    "module('ESLint - " + path.dirname(relativePath) + "');\n" +
    "test('" + relativePath + " should pass ESLint', function(assert) {\n" +
    "  assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
   "});\n";
}

function mochaTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { describe, it } from 'mocha';\n" +
    "import { assert } from 'chai';\n" +
    "describe('ESLint - " + path.dirname(relativePath) + "', function() {\n" +
    "  it('" + relativePath + " should pass ESLint', function() {\n" +
    "    assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
   "  });\n});\n";
}

function render(errors) {
  return errors.map(function(error) {
    return error.line + ':' + error.column + ' ' +
      ' - ' + error.message + ' (' + error.ruleId +')';
  }).join('\n');
}
