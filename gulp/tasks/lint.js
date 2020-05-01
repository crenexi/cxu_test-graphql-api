const gulp = require('gulp');
const eslint = require('gulp-eslint');
const logger = require('../logger');

const esLintOpts = {
  configFile: './.eslintrc',
};

/** Lints server JS */
const lint = () => {
  logger.message('Linting Server', 'blue.bold');

  return gulp.src([`src/**/*.ts`])
    .pipe(eslint(esLintOpts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

module.exports = { lint };
