import { transports as winstonTransports, format } from 'winston';
import Transport from 'winston-transport';
import config from '@config/app.config';
import loggerConfig from './logger-config';

const { isDevelopment, debugging } = config;
const { combine, errors, colorize, simple } = format;

/** Format for JSON */
const jsonFormat = () => combine(
  format.timestamp({ format: loggerConfig.dateFormat }),
  format.errors({ stack: true }),
  format.json(),
);

/** Format for console */
const consoleFormat = () => combine(
  errors({ stack: true }),
  colorize(),
  simple(),
);

const loggerTransports = (): Transport[] => {
  const transports: Transport[] = [];

  const fileTransportCommons = {
    maxsize: 5242880, // 5MB
    maxFiles: !isDevelopment ? 30 : 5,
  };

  // combined and error logs by default
  if (!isDevelopment) {
    transports.push(
      new winstonTransports.File({
        level: 'error',
        format: jsonFormat(),
        handleExceptions: true,
        filename: loggerConfig.paths.errorLog,
        ...fileTransportCommons,
      }),
      new winstonTransports.File({
        format: jsonFormat(),
        handleExceptions: false,
        filename: loggerConfig.paths.combinedLog,
        ...fileTransportCommons,
      }),
    );
  }

  // Add Console log transport for development
  if (isDevelopment) {
    transports.push(new winstonTransports.Console({
      level: debugging ? 'debug' : 'info',
      format: consoleFormat(),
      handleExceptions: true,
    }));
  }

  return transports;
};

export default loggerTransports;
