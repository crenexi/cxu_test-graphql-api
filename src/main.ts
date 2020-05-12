import logger from './services/logger';
import connect from './connect';
import { bootstrap } from './app';
import { Main } from './types';

/** Awaits database connection before proceeding */
const main: Main = async () => {
  try {
    // Connect to database before proceeding
    const conn = await connect();
    return bootstrap(conn);
  } catch (err) {
    // Database connection error
    logger.critical(new Error(`[TypeORM connection] ${err}`));
    return null;
  }
};

export default main;
