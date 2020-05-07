import express from 'express';
import log from 'fancy-log';
import chalk from 'chalk';
import debugLib from 'debug';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
import logger from './services/logger';
import initConnection from './init-connection';
import initSession from './init-session';
import initMiddlewares from './init-middlewares';
import router from './router';

// Environment
const env = process.env.NODE_ENV || 'development';

/** Express application */
const createApp = () => {
  log(chalk.blue(`Initializing ${env} application...`));
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  app.set('trust proxy', 1);

  initSession(app);
  initMiddlewares(app);
  app.use(router());

  debug('App boostrap complete');
  return app;
};

/** Awaits database connection before proceeding */
const initApp = async (): Promise<express.Application | null> => {
  try {
    // Connect to database before proceeding
    await initConnection();
    return createApp();
  } catch (err) {
    // Database connection error
    logger.critical(new Error(`[TypeORM connection] ${err}`));
    return null;
  }
};

export default initApp;
