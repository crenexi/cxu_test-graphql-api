import express from 'express';
import log from 'fancy-log';
import chalk from 'chalk';
import debugLib from 'debug';
import { createConnection, Connection } from 'typeorm';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
import { ormConfig } from './config';
import logger from './services/logger';
import initMiddlewares from './init-middlewares';
import router from './router';

/** Database connection */
const connectTypeORM = async (): Promise<Connection> => {
  const dbName = process.env.POSTGRES_DATABASE;
  const dbUsername = process.env.POSTGRES_USERNAME;
  const runMigrations = process.env.POSTGRES_MIGRATE === 'true';

  log(chalk.blue(`Connecting to ${dbName} as ${dbUsername}...`));
  const connection = await createConnection(ormConfig);

  // Run migrations if specified in env
  if (connection && runMigrations) {
    connection.runMigrations();
  }

  const msg = `Connected to ${dbName} database`.toUpperCase();
  log(chalk.blue.bold(msg));

  return connection;
};

/** Express application */
const createApp = () => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  initMiddlewares(app);
  app.use(router());

  debug('App boostrap complete');

  return app;
};

/** Awaits database connection before proceeding */
const initApp = async (): Promise<express.Application | null> => {
  const env = process.env.NODE_ENV || 'development';
  log(chalk.blue(`Initializing ${env} application...`));

  try {
    await connectTypeORM();
    return createApp();
  } catch (err) {
    logger.critical(new Error(`[TypeORM connection] ${err}`));
    return null;
  }
};

export default initApp;
