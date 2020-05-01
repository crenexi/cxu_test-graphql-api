const gulpNodemon = require('gulp-nodemon');
const nodemon = require('nodemon');
const stream = require('stream');
const logger = require('../logger');
const wwwScript = './bin/www';

/** Starts development server */
const startDevServer = (started) => {
  // Avoid nodemon being started multiple times
  if (!started) {
    started = true; // eslint-disable-line
  }
};

/** Restarts nodemon */
function restartNodemon(done) {
  nodemon.emit('restart');
  done();
}

/** Serves development server */
const serveDev = (done) => {
  const started = false;

  const options = {
    nodemon: {
      done,
      env: {
        NODE_ENV: 'development',
      },
      script: wwwScript,
      ext: 'js json html ejs',
    },
  };

  return gulpNodemon(options.nodemon)
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
