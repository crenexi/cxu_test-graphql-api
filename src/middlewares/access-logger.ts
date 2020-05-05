import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';

const logFile = 'app.access.log';

interface AccessLoggerOpts {
  logDir?: string;
}

const accessLogger = ({ logDir }: AccessLoggerOpts) => {
  const format = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

  // Ensure log directory exists
  const dir = logDir || path.join(__dirname, 'logs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Get log stream
  const stream = rfs.createStream(logFile, {
    path: dir,
    size: '5MB',
    interval: '1d',
    compress: 'gzip',
    maxSize: '100M',
    maxFiles: 30,
  });

  // Setup the logger
  return morgan(format, { stream });
};

export default accessLogger;
