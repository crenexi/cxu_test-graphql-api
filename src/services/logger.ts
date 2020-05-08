import winston, { createLogger, format, transports, Logger } from 'winston';
import Transport from 'winston-transport';
import config from '../config/server.config';

const loggerConfig = {
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  paths: {
    combinedLog: './logs/app.combined.log',
    errorLog: './logs/app.error.log',
  },
  levels: {
    map: {
      emergency: 0,
      critical: 1,
      error: 2,
      warning: 3,
      info: 4,
      debug: 5,
    },
    colors: {
      emergency: 'bold red',
      critical: 'bold yellow',
      error: 'red',
      warning: 'yellow',
      info: 'blue',
      debug: 'magenta',
    },
  },
};

interface LogOpts {
  level: string;
  value: string | Error;
  meta?: object;
}

// Make winston aware of level colors
winston.addColors(loggerConfig.levels.colors);

const { isDevelopment, debugging } = config;
const { combine } = format;

class LoggerService {
  logData: null | object;
  logger: Logger;

  constructor() {
    this.logData = null;

    this.logger = createLogger({
      levels: loggerConfig.levels.map,
      format: LoggerService.jsonFormat(),
      transports: LoggerService.transports(),
      exitOnError: false,
    });
  }

  /** Sets the log data */
  setLogData(logData: null | object) {
    this.logData = logData;
  }

  /** Severity 0 - emergency */
  async emergency(value: string | Error, meta?: object): Promise<void> {
    this.log({ value, meta, level: 'emergency' });
  }

  /** Severity 1 - critical */
  async critical(value: string | Error, meta?: object): Promise<void> {
    this.log({ value, meta, level: 'critical' });
  }

  /** Severity 2 - error */
  async error(value: string | Error, meta?: object): Promise<void> {
    this.log({ value, meta, level: 'error' });
  }

  /** Severity 3 - warning */
  async warning(value: string, meta?: object): Promise<void> {
    this.log({ value, meta, level: 'warning' });
  }

  /** Severity 4 - info */
  async info(value: string, meta?: object): Promise<void> {
    this.log({ value, meta, level: 'info' });
  }

  /** Severity 5 - debug */
  async debug(value: string, meta?: object): Promise<void> {
    if (debugging) {
      this.log({ value, meta, level: 'debug' });
    }
  }

  /** Helper */
  private log(opts: LogOpts): void {
    const { level, value, meta } = opts;

    // Reduce string/Error to string
    const message: string = (() => {
      if (value instanceof Error) return value.stack || value.toString();
      return value;
    })();

    this.logger.log(level, message, { meta });
  }

  /** Format for JSON */
  static jsonFormat() {
    return combine(
      format.colorize(),
      format.timestamp({ format: loggerConfig.dateFormat }),
      format.errors({ stack: true }),
      format.json(),
    );
  }

  /** Transports */
  static transports(): Transport[] {
    const transportsArr: Transport[] = [];

    const fileTransportCommons = {
      maxsize: 5242880, // 5MB
      maxFiles: !isDevelopment ? 30 : 5,
    };

    // combined and error logs by default
    if (!isDevelopment) {
      transportsArr.push(
        new transports.File({
          level: 'error',
          handleExceptions: true,
          filename: loggerConfig.paths.errorLog,
          ...fileTransportCommons,
        }),
        new transports.File({
          handleExceptions: false,
          filename: loggerConfig.paths.combinedLog,
          ...fileTransportCommons,
        }),
      );
    }

    // Add Console log transport for development
    if (isDevelopment) {
      transportsArr.push(new transports.Console({
        level: debugging ? 'debug' : 'info',
        format: format.simple(),
        handleExceptions: true,
      }));
    }

    return transportsArr;
  }
}

export default new LoggerService();
