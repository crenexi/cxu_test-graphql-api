import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import logger from '../services/logger';
// import fs from 'fs';

// Entity imports
import SuperHero from '../entity/SuperHero';
import SuperPower from '../entity/SuperPower';

// All entities
const entities = [
  SuperHero,
  SuperPower,
];

// SSL PEM
// const readPEM = () => {
//   const path = './src/config/certs/rds-ca-2019-root.pem';
//   return fs.readFileSync(path).toString();
// };

const ormConfig: ConnectionOptions = {
  entities,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, // default postgres port
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  logging: true,
  synchronize: true,
  // ssl: { ca: readPEM() },
  poolErrorHandler: logger.error,
};

export default ormConfig;
