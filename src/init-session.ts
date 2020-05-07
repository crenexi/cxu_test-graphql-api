import express from 'express';
import log from 'fancy-log';
import chalk from 'chalk';
import IORedis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { v4 as uuidv4 } from 'uuid';
import logger from './services/logger';
import { alphanumeric } from './helpers';

const ONE_DAY = 86400;

// Environment variables
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

/** Setup Redis store for session */
const redisStore = (): connectRedis.RedisStore => {
  const port = parseInt(process.env.REDIS_PORT || '', 10) || 6379;

  // High-performance Redis client
  const client = new IORedis({
    showFriendlyErrorStack: true,
  });

  // Connect handler
  client.on('connect', (): void => {
    log(chalk.green(`Connected to Redis`.toUpperCase()));
  });

  // Error handler
  client.on('error', (err): void => {
    logger.critical(new Error(`[Redis] ${err}`));
  });

  // Redis store
  const Store = connectRedis(session);

  return new Store({
    port,
    client,
    host: 'localhost',
    ttl: ONE_DAY,
  });
};

/** Session middleware */
const initSession = (app: express.Application): void => {
  const secret = process.env.SESSION_SECRET || 'Avengers Assemble';

  app.use(session({
    secret,
    name: alphanumeric(uuidv4()),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: isProduction,
      maxAge: ONE_DAY,
    },
    store: redisStore(),
  }));
};

export default initSession;
