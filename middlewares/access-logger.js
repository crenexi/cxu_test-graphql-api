const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const accessLogger = ({ logDir, interval = '7d' }) => {
  const format = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

  // Ensure log directory exists
  const dir = logDir || path.join(__dirname, 'log');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Get log stream
  const stream = rfs.createStream('access-log', { interval, path: dir });

  // Setup the logger
  // return morgan('combined', { stream });
  return morgan(format, { stream });
};

module.exports = accessLogger;
