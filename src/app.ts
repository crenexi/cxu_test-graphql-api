import 'reflect-metadata';
import dotEnvSafe from 'dotenv-safe';
import express from 'express';
import debugLib from 'debug';
import cors from 'cors';
import bodyParser from 'body-parser';
// import path from 'path';
import errorHandler from 'errorhandler';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
// import accessLogger from './middlewares/access-logger';
// import config from './config';
import apiController from './api';

const debug = debugLib('express:app');
const app = express();

// Environment
dotEnvSafe.config();
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
// const isDevelopment = env === 'development';

// ##########################
// ### Database #############
// ##########################

const initDatabase = () => {
  // Database URI
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Setup logger middleware
  // app.use(accessLogger({
  //   logDir: path.join(__dirname, '../logs'),
  // }));
};

// ##########################
// ### Controllers ##########
// ##########################

const initControllers = () => {
  app.use('/', apiController);
};

// ##########################
// ### Bootstrap ############
// ##########################

debug('Bootstrapping app...');

initDatabase();
initMiddlewares();
initControllers();

debug('App boostrap complete');

export default app;
