import { createConnection, Connection } from 'typeorm';
import log from 'fancy-log';
import chalk from 'chalk';
import { ormConfig } from './config';

const initConnection = async (): Promise<Connection | null> => {
  log(chalk.blue(`Connecting to SQL...`));
  let connection = null;

  try {
    connection = await createConnection(ormConfig);
    log(chalk.green.bold('Connected to SQL'));
  } catch (err) {
    log(chalk.red.bold('TypeORM connection error: ', err))
  }

  return connection;
};

export default initConnection;
