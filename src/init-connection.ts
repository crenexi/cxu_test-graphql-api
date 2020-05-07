import log from 'fancy-log';
import chalk from 'chalk';
import { createConnection, Connection } from 'typeorm';
import { ormConfig } from './config';

const initConnection = async (): Promise<Connection> => {
  const dbName = process.env.POSTGRES_DATABASE;
  const dbUsername = process.env.POSTGRES_USERNAME;
  const runMigrations = process.env.POSTGRES_MIGRATE === 'true';

  // Make the connection
  log(chalk.blue(`Connecting to ${dbName} as ${dbUsername}...`));
  const connection = await createConnection(ormConfig);

  // Run migrations if specified in env
  if (connection && runMigrations) {
    await connection.runMigrations();
  }

  // Success message
  const msg = `Connected to ${dbName} database`.toUpperCase();
  log(chalk.blue.bold(msg));

  return connection;
};

export default initConnection;
