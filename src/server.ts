import debugLib from 'debug';
import http from 'http';
import log from 'fancy-log';
import chalk from 'chalk';
import app from './app';

const debug = debugLib('express:server');

/** Normalize port */
const normalizePort = (val: number | string) => {
  const port = parseInt(`${val}`, 10);

  if (Number.isNaN(port)) { return val; } // named pipe
  if (port >= 0) { return port; } // port number

  return false;
};

// Set ports
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// HTTP server
const server = http.createServer(app);

/** Listen to server */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${!addr ? '' : addr.port}`;

  const msgStr = `Magic now at ${bind}`;
  log(chalk.blue.bold(msgStr));
  debug(msgStr);
};

/** Server error */
const onError = (err: NodeJS.ErrnoException) => {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  const privilegesMsg = `${bind} requires elevated privileges!`;
  const inUseMessage = `${bind} is already in use!`;
  switch (err.code) {
    case 'EACCES':
      log(chalk.red.bold(privilegesMsg));
      debug(privilegesMsg);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log(chalk.red.bold(inUseMessage));
      debug(inUseMessage);
      process.exit(1);
      break;
    default:
      throw err;
  }
};

// Listen and handle
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);
