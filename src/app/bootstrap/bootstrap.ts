import express from 'express';
import debugLib from 'debug';
import { Bootstrap } from '@common/types';
import initApollo from './init-apollo';
import initSession from './init-session';
import initMiddlewares from './init-middlewares';
import appRouter from '../router';

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
  app.use(appRouter);

  debug('App boostrap complete');
  return app;
};

export default bootstrap;
