/*eslint-env node*/

'use strict';

module.exports = {
  name: 'lint',
  description: 'Run ESLint on your Ember app',
  works: 'insideProject',

  run: function() {
    return require('../tasks/lint').call(this);
  }
};
