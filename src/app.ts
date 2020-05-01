import 'reflect-metadata';
import dotEnvSafe from 'dotenv-safe';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import path from 'path';
import errorHandler from 'errorhandler';
// import { ApolloServer, ApolloError } from "apollo-server-express";
// import { v4 } from "uuid";
// import accessLogger from './middlewares/access-logger';
// import config from './config';
import apiController from './api';

// Load environment variables as soon as possible
dotEnvSafe.config();

// Environment
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
// const isDevelopment = env === 'development';

// Database URI
// const dbUri = process.env.DB_URI || defaultDbUri;

// Create application
const port = process.env.PORT || '3000';
const app = express();

// Use error handler if not production
if (!isProduction) {
  app.use(errorHandler());
}

// CORS configuration
app.use(cors());

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup logger middleware
// app.use(accessLogger({
//   logDir: path.join(__dirname, '../logs'),
// }));

// Routes setup
app.use('/', apiController);

// Create server and listen
app.set('port', port);

export default app;
