import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';

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
  const stream = rfs.createStream('access.log', { interval, path: dir });

  // Setup the logger
  return morgan(format, { stream });
};

export default accessLogger;
