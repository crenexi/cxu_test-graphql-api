export interface LoggerConfig {
  dateFormat: string;
  paths: {
    combinedLog: string;
    errorLog: string;
  };
  levels: {
    map: {
      [key: string]: number;
    };
    colors: {
      [key: string]: string;
    };
  };
}

const loggerConfig: LoggerConfig = {
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

export default loggerConfig;
