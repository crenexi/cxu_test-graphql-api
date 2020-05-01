import dogEnv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import errorHandler from "errorhandler";
import accessLogger from './middlewares/access-logger';
// import serverConfig from './config/server-config';
import apiRouter from './api';

// Load dot-env
dogEnv.config();

// Environment
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDevelopment = env === 'development';

// Configuration values
// const { dbName } = config;

// Database URI
// const defaultDbUri = `mongodb://localhost:27017/${dbName}`;
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
app.use(accessLogger({
  logDir: path.join(__dirname, '../logs'),
}));

// Routes setup
app.use('/', apiRouter);

// Create server and listen
app.set('port', port);

module.exports = app;
