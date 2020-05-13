/* disable-eslint*/
const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const tasksGlob = 'gulp/tasks/*.js';

// Load tasks
const lintTasks = require('./gulp/tasks/lint');

// Load tasks into registry
const hub = new HubRegistry([tasksGlob]);
gulp.registry(hub);

/*==============================================================================
=== Linting ===*/

gulp.task('lint', lintTasks.lint);

/*==============================================================================
=== Default and production ===*/

gulp.task('default', done => done());
