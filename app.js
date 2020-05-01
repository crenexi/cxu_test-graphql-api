require('module-alias/register');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const accessLogger = require('./middlewares/access-logger');
// const config = require('./config/server-config');
const apiRouter = require('./api');

// Configuration values
// const { dbName } = config;

// Database URI
// const defaultDbUri = `mongodb://localhost:27017/${dbName}`;
// const dbUri = process.env.DB_URI || defaultDbUri;

// Create application
const port = process.env.PORT || '3000';
const app = express();

// CORS configuration
app.use(cors());

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup logger middleware
app.use(accessLogger({
  logDir: path.join(__dirname, 'logs'),
}));

// Routes setup
app.use('/', apiRouter);

// Create server and listen
app.set('port', port);

module.exports = app;
