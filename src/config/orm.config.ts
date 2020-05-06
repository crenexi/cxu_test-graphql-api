import { ConnectionOptions } from 'typeorm';
import fs from 'fs';
+import logger from '../services/logger';

// Entity imports
import SuperHero from '../entity/SuperHero';
import SuperPower from '../entity/SuperPower';

// All entities
const entities = [
  SuperHero,
  SuperPower,
];

// SSL PEM
const readPEM = () => {
  const path = './src/config/certs/rds-ca-2019-root.pem';
  return fs.readFileSync(path).toString();
};

const ormConfig: ConnectionOptions = {
  entities,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: false,
  synchronize: true,
  ssl: { ca: readPEM() },
  poolErrorHandler: logger.error,
};

export default ormConfig;
