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

const app = express();
const debug = debugLib('express:app');

// Environment
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
// const isDevelopment = env === 'development';
const debugging = !!process.env.DEBUG;

// ##########################
// ### App setup ############
// ##########################

const initApp = () => {
  app.set('view engine', 'ejs');
};

// ##########################
// ### Database #############
// ##########################

const initDatabase = () => {
  // const dbUri = process.env.DB_URI || defaultDbUri;
};

// ##########################
// ### Middlewares ##########
// ##########################

const initMiddlewares = () => {
  // Error handler if not production
  if (!isProduction) {
    app.use(errorHandler());
  }

  // CORS
  app.use(cors());

  // Body parser
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('X-HTTP-Method-Override'));

  // Setup logger middleware if prod or debug
  if (isProduction || debugging) {
    app.use(accessLogger({
      logDir: path.join(__dirname, '../logs'),
    }));
  }
};

// ##########################
// ### Bootstrap ############
// ##########################

debug('Bootstrapping app...');

initApp();
initDatabase();
initMiddlewares();
app.use(apiRouter());

debug('App boostrap complete');

export default app;
