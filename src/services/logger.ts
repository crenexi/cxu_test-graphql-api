import winston, {
  createLogger,
  format,
  transports,
  Logger,
  LogEntry,
} from 'winston';
import Transport from 'winston-transport';
const { combine, colorize, timestamp } = format;

const config = {
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
  type: string;
  message: string;
  obj?: null | object;
}

// Environment variables
const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';
const debugging = !!process.env.DEBUG;

// Make winston aware of level colors
winston.addColors(config.levels.colors);

class LoggerService {
  logData: null | object;
  logger: Logger;

  constructor() {
    this.logData = null;

    this.logger = createLogger({
      levels: config.levels.map,
      exitOnError: false,
      format: LoggerService.format(),
      transports: LoggerService.transports(),
    });
  }

  /** Sets the log data */
  setLogData(logData: null | object) {
    this.logData = logData;
  }

  /** Severity 0 - emergency */
  async emergency(message: string, obj?: object): Promise<void> {
    this.log({ message, obj, level: 'emergency' });
  }

  /** Severity 1 - critical */
  async critical(message: string, obj?: object): Promise<void> {
    this.log({ message, obj, level: 'critical' });
  }

  /** Severity 2 - error */
  async error(message: string, obj?: object): Promise<void> {
    this.log({ message, obj, level: 'error' });
  }

  /** Severity 3 - warning */
  async warning(message: string, obj?: object): Promise<void> {
    this.log({ message, obj, level: 'warning' });
  }

  /** Severity 4 - info */
  async info(message: string, obj?: object): Promise<void> {
    this.log({ message, obj, level: 'info' });
  }

  /** Severity 5 - debug */
  async debug(message: string, obj?: object): Promise<void> {
    if (debugging) {
      this.log({ message, obj, level: 'debug' });
    }
  }

  /** Helper */
  private log(opts: LogEntry): void {
    const { level, message, obj } = opts;

    if (obj != null) {
      this.logger.log(level, message, { obj });
    } else {
      this.logger.log(level, message);
    }
  }

  /** Format */
  static format() {
    return combine(
      colorize(),
      timestamp({
        format: config.dateFormat,
      }),
      format.json(),
    );
  }

  /** Transports */
  static transports(): Transport[] {
    const fileTransportCommons = {
      maxsize: 5242880, // 5MB
      maxFiles: !isDevelopment ? 30 : 5,
    };

    // combined and error logs by default
    const transportsArr: Transport[] = [
      new transports.File({
        level: 'error',
        handleExceptions: true,
        filename: config.paths.errorLog,
        ...fileTransportCommons,
      }),
      new transports.File({
        handleExceptions: false,
        filename: config.paths.combinedLog,
        ...fileTransportCommons,
      }),
    ];

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
