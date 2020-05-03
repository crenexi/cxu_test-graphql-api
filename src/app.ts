import 'reflect-metadata';
import express from 'express';
import debugLib from 'debug';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
import accessLogger from './middlewares/access-logger';
// import config from './config';
import apiRouter from './api/api.router';

// Environment variables
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
// const isDevelopment = env === 'development';
const debugging = !!process.env.DEBUG;

// ##########################
// ### Database #############
// ##########################

const initDatabase = (): void => {
  // const dbUri = process.env.DB_URI || defaultDbUri;
};

// ##########################
// ### Middlewares ##########
// ##########################

const initMiddlewares = (app: express.Application): void => {
  // Error handler if not production
  if (!isProduction) {
    app.use(errorHandler());
  }

  // HTTP logger (uses morgan)
  if (isProduction || debugging) {
    app.use(accessLogger({
      logDir: path.join(__dirname, '../logs'),
    }));
  }

  // Body and cookie parsers
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(cookieParser());

  // CORS middleware
  app.use(cors());

  // Helmet middleware
  app.use(helmet());

  // JSON middleware
  app.use(express.json());
};

// ##########################
// ### App setup ############
// ##########################

const initApp = (): express.Application => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  initDatabase();
  initMiddlewares(app);
  app.use(apiRouter());

  debug('App boostrap complete');
  return app;
};

export default initApp();
