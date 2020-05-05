import { createConnection, Connection } from 'typeorm';
import log from 'fancy-log';
import chalk from 'chalk';
import logger from './services/logger';
import { ormConfig } from './config';

const initConnection = async (): Promise<void> => {
  log(chalk.blue(`Connecting to SQL...`));
  let connection: Connection;

  try {
    connection = await createConnection(ormConfig);
    log(chalk.green.bold('Connected to SQL'));
    log(connection);
  } catch (err) {
    logger.critical(new Error('TypeORM connection error'));
  }
};

export default initConnection;
