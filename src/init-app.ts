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

const connectTypeORM = async (): Promise<Connection> => {
  const connection = await createConnection(ormConfig);
  log(chalk.blue(`Connecting to SQL...`));
  return connection;
};

const createApp = () => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  initMiddlewares(app);
  app.use(router());

  debug('App boostrap complete');

  return app;
};

const initApp = async (): Promise<express.Application | null> => {
  try {
    await connectTypeORM();
    return createApp();
  } catch (err) {
    logger.critical(new Error(`TypeORM connection error: ${err}`));
    return null;
  }
};

export default initApp;
