import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import debugLib from 'debug';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
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

  // CORS
  app.use(cors());

  // Body parser
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('X-HTTP-Method-Override'));
};

// ##########################
// ### App setup ############
// ##########################

const initApp = (): express.Application => {
  const debug = debugLib('express:app');
  debug('Bootstrapping app...');

  const app = express();

  // Public directory and views
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  initDatabase();
  initMiddlewares(app);
  app.use(apiRouter());

  debug('App boostrap complete');
  return app;
};

export default initApp();
