import express from 'express';
import log from 'fancy-log';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import IORedis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import rateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import config from './config/server.config';
import { alphanumeric } from './helpers';
import logger from './services/logger';

const TEN_MINUTES = 1000 * 60 * 10;
const ONE_DAY = 86400;

interface RedisState {
  store: connectRedis.RedisStore;
  client: IORedis.Redis;
}

/** Setup Redis store, rate limiter, and handlers */
const initRedis = (): RedisState => {
  // High-performance Redis client
  const client = new IORedis({
    showFriendlyErrorStack: true,
  });

  // Flush in dev env
  if (config.isDevelopment) {
    client.flushall();
  }

  // Connect handler
  client.on('connect', (): void => {
    log(chalk.green(`Connected to Redis`.toUpperCase()));
  });

  // Error handler
  client.on('error', (err): void => {
    logger.critical(new Error(`[Redis] ${err}`));
  });

  // Redis store
  const store = new (connectRedis(session))({
    client,
    port: config.redis.port,
    host: config.redis.host,
    ttl: ONE_DAY,
  });

  return { store, client };
};

/** Session middleware */
const initSession = (app: express.Application): void => {
  const { store, client } = initRedis();

  // Rate limiter
  app.use(rateLimit({
    store: new RateLimitRedis({ client }),
    windowMs: TEN_MINUTES,
    max: 100,
    message: 'Too many requests in 10 minutes. Try again in a minute',
  }));

  // Session
  app.use(session({
    store,
    name: alphanumeric(uuidv4()),
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: config.isProduction,
      maxAge: ONE_DAY,
    },
  }));
};

export default initSession;
