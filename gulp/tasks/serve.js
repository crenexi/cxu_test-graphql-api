const gulpNodemon = require('gulp-nodemon');
const nodemon = require('nodemon');
const stream = require('stream');
const logger = require('../logger');

/** Starts development server */
const startDevServer = (started, done) => {
  // Avoid nodemon being started multiple times
  if (!started) {
    started = true;
  }

  // Ensure a graceful exit
  process.on('SIGINT', () => process.exit(1));
  done();
};

/** Restarts nodemon */
const restartNodemon = (done) => {
  nodemon.emit('restart');
  done();
};

/** Serves development server */
const serveDev = (done) => {
  const started = false;

  const nodemonOpts = {
    done,
    env: {
      NODE_ENV: 'development',
    },
    watch: ['src'],
    ignore: ['src/**/*.spec.ts'],
    ext: 'ts js json',
    // Clean, then run ts-node, and make sure we deal with the paths issue
    exec: 'ts-node -r tsconfig-paths/register ./src/server.ts',
  };

  return gulpNodemon(nodemonOpts)
    .on('start', () => startDevServer(started, done))
    .on('crash', () => {
      logger.error('APPLICATION HAS CRASHED!');
      stream.emit('restart', 10);
    });
};

module.exports = {
  serveDev,
  restartNodemon,
};
