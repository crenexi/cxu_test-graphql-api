import express from 'express';
import log from 'fancy-log';
import chalk from 'chalk';
import IORedis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import logger from './services/logger';
import { alphanumeric } from './helpers';

const ONE_DAY = 86400;

/** Setup Redis store for session */
const redisStore = (): connectRedis.RedisStore => {
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
    client,
    port: config.redis.port,
    host: config.redis.host,
    ttl: ONE_DAY,
  });
};

/** Session middleware */
const initSession = (app: express.Application): void => {
  app.use(session({
    name: alphanumeric(uuidv4()),
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: config.isProduction,
      maxAge: ONE_DAY,
    },
    store: redisStore(),
  }));
};

export default initSession;
