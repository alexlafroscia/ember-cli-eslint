/*eslint-env node*/

'use strict';

module.exports = {
  name: 'lint:fix',
  description: 'Run ESLint fixes on your Ember app',
  works: 'insideProject',

  run: require('../tasks/fix')
};
