const winston = require('winston');

const dateFormat = () => new Date(Date.now()).toUTCString();

class LoggerService {
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

  setLogData(logData) {
    this.logData = logData;
  }

  log(type, message, obj) {
    if (obj !== null) {
      this.logger.log(type, message, { obj });
    } else {
      this.logger.log(type, message);
    }
  }

  async info(message, obj = null) {
    this.log('info', message, obj);
  }

  async debug(message, obj = null) {
    this.log('debug', message, obj);
  }

  async error(message, obj = null) {
    this.log('error', message, obj);
  }
}

module.exports = LoggerService;
