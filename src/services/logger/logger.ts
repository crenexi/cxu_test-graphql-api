import winston, { createLogger, format, Logger } from 'winston';
import config from '@config/app.config';
import loggerConfig from './logger-config';
import loggerTransports from './logger-transports';

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
      transports: loggerTransports(),
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
      if (value instanceof Error) return JSON.stringify(value);
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
}

export default new LoggerService();
