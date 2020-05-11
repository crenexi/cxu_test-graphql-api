import express from 'express';
import debugLib from 'debug';
import logger from './services/logger';
import { Main, Bootstrap } from './types';
import initConnection from './init-connection';
import initApollo from './init-apollo';
import initSession from './init-session';
import initMiddlewares from './init-middlewares';
import router from './router';

/** Express application */
const bootstrap: Bootstrap = async (conn) => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  app.set('trust proxy', 1);

  // 1. Session middleware
  initSession(app);

  // 2. Misc middlewares
  initMiddlewares(app);

  // 3. GraphQL endpoint
  await initApollo({ conn, app });

  // 4. Other endpoints
  app.use(router());

  debug('App boostrap complete');
  return app;
};

/** Awaits database connection before proceeding */
const main: Main = async () => {
  try {
    // Connect to database before proceeding
    const conn = await initConnection();
    return bootstrap(conn);
  } catch (err) {
    // Database connection error
    logger.critical(new Error(`[TypeORM connection] ${err}`));
    return null;
  }
};

export default main;
