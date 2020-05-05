import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';

const logFile = 'app.access.log';

interface AccessLoggerOpts {
  logDir?: string;
  interval?: string;
}

const accessLogger = ({ logDir, interval = '7d' }: AccessLoggerOpts) => {
  const format = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

  // Ensure log directory exists
  const dir = logDir || path.join(__dirname, 'logs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Get log stream
  const stream = rfs.createStream(logFile, { interval, path: dir });

  // Setup the logger
  return morgan(format, { stream });
};

export default accessLogger;
