'use strict';

const npm = require('npm');
const path = require('path');
const config = require('../gulp-config');

module.exports = (cb) => {
  process.chdir(path.resolve(config.webTemplateRepo.folder));
  npm.load(() => npm.run('release'));
};
