/* disable-eslint*/
const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const tasksGlob = 'gulp/tasks/*.js';

// Load tasks
const lintTasks = require('./gulp/tasks/lint');
const serveTasks = require('./gulp/tasks/serve');

// Load tasks into registry
const hub = new HubRegistry([tasksGlob]);
gulp.registry(hub);

/*==============================================================================
=== Linting ===*/

gulp.task('lint', lintTasks.lint);

/*==============================================================================
=== Serving ===*/

gulp.task('serve:dev', serveTasks.serveDev);
gulp.task('restart', serveTasks.restartNodemon)

/*==============================================================================
=== Default and production ===*/

gulp.task('default', serveTasks.serveDev);
