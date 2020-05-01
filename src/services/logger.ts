import winston from 'winston';

const dateFormat = () => new Date(Date.now()).toUTCString();

interface LogOpts {
  type: string;
  message: string;
  obj?: null | object;
}

class LoggerService {
  logData: null | object;
  logger: winston.Logger;

  constructor() {
    this.logData = null;

    // Creates Console log transport
    const consoleTransport = (() => new winston.transports.Console())();

    // Creates File log tranport
    // const logFileName = `../logs/general.log`;
    // const fileTransport = () => new winston.transports.File({ logFileName });

    // Format method
    const format = (() => winston.format.printf((info) => {
      let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`;
      message = info.obj ? ` | ${message} data:${JSON.stringify(info.obj)}` : message;
      message = this.logData ? ` | ${message} logData:${JSON.stringify(this.logData)} | ` : message;
      return message;
    }))();

    // Create logger
    this.logger = winston.createLogger({
      format,
      transports: [consoleTransport],
    });
  }

  /** Sets the log data */
  setLogData(logData: null | object) {
    this.logData = logData;
  }

  /** Info log */
  async info(
    message: string,
    obj: null | object = null,
  ) {
    this.log({ message, obj, type: 'info' });
  }

  /** Debug log */
  async debug(
    message: string,
    obj: null | object = null,
  ) {
    this.log({ message, obj, type: 'debug' });
  }

  /** Error log */
  async error(
    message: string,
    obj: null | object = null,
  ) {
    this.log({ message, obj, type: 'error' });
  }

  /** Helper */
  private log(opts: LogOpts) {
    const { type, message, obj } = opts;

    if (obj != null) {
      this.logger.log(type, message, { obj });
    } else {
      this.logger.log(type, message);
    }
  }
}

export default new LoggerService();
