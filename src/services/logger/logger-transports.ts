import { transports as winstonTransports, format } from 'winston';
import Transport from 'winston-transport';
import config from '@config/app.config';
import loggerConfig from './logger-config';

const { isDevelopment, debugging } = config;

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
        handleExceptions: true,
        filename: loggerConfig.paths.errorLog,
        ...fileTransportCommons,
      }),
      new winstonTransports.File({
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
      format: format.simple(),
      handleExceptions: debugging,
    }));
  }

  return transports;
};

export default loggerTransports;
