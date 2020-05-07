import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
import accessLogger from './middlewares/access-logger';
import config from './config';

// Environment variables

const initMiddlewares = (app: express.Application): void => {
  const { isProduction, debugging } = config;

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

export default initMiddlewares;
