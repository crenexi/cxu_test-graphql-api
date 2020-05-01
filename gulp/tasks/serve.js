const gulpNodemon = require('gulp-nodemon');
const nodemon = require('nodemon');
const stream = require('stream');
const logger = require('../logger');
const wwwScript = './dist/bin/www';

/** Starts development server */
const startDevServer = (started) => {
  // Avoid nodemon being started multiple times
  if (!started) {
    started = true;
  }
};

/** Restarts nodemon */
const restartNodemon = (done) => {
  nodemon.emit('restart');
  done();
}

/** Serves development server */
const serveDev = (done) => {
  const started = false;

  const nodemonOpts = {
    done,
    env: {
      NODE_ENV: 'development',
    },
    script: wwwScript,
    ext: 'ts js json',
    exec: "ts-node src/server.ts",
    watch: ["src"],
  },

  return gulpNodemon(nodemonOpts)
    .on('start', () => startDevServer(started))
    .on('crash', () => {
      logger.error('APPLICATION HAS CRASHED!');
      stream.emit('restart', 10);
    });
};

module.exports = {
  serveDev,
  restartNodemon,
};
