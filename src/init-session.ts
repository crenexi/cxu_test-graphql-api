import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import logger from './services/logger';

const ONE_DAY = 86400;

// Environment variables
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

/** Setup Redis store for session */
const redisStore = (): connectRedis.RedisStore => {
  const port = parseInt(process.env.REDIS_PORT || '', 10) || 6379;
  const client = redis.createClient();
  const Store = connectRedis(session);

  // Handle errors
  client.on('error', (err) => {
    logger.critical(new Error(`[Redis] ${err}`));
  });

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
    name: '_redis',
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
