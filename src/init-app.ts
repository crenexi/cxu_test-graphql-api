import express from 'express';
import debugLib from 'debug';
import logger from './services/logger';
import initConnection from './init-connection';
import initApollo from './init-apollo';
import initSession from './init-session';
import initMiddlewares from './init-middlewares';
import router from './router';

/** Express application */
const createApp = async () => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  app.set('trust proxy', 1);

  await initApollo(app);
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
