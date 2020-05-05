import express from 'express';
import debugLib from 'debug';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
import initConnection from './init-connection';
import initMiddlewares from './init-middlewares';
import router from './router';

const initApp = async (): Promise<express.Application> => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  await initConnection();

  const app = express();

  initMiddlewares(app);
  app.use(router());

  debug('App boostrap complete');
  return app;
};

export default initApp;
