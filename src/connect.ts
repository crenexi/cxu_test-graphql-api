import log from 'fancy-log';
import chalk from 'chalk';
import { createConnection } from 'typeorm';
import { Connect } from './types';
import config from './config/server.config';
import typeormConfig from './config/orm.config';

const connect: Connect = async () => {
  const dbName = config.postgres.database;
  const runMigrations = config.orm.migrate;

  // Make the connection
  const connection = await createConnection(typeormConfig);

  // Run migrations if specified in env
  if (connection && runMigrations) {
    await connection.runMigrations();
  }

  // Success message
  const msg = `${'Connected to database'.toUpperCase()}: ${dbName}`;
  log(chalk.green(msg));

  return connection;
};

export default connect;
