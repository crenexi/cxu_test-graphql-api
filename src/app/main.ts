import logger from '../services/logger';
import connect from './connect';
import bootstrap from './bootstrap';
import { Main } from '../common/types';

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
