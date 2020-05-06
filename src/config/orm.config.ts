import { ConnectionOptions } from 'typeorm';
import fs from 'fs';
import logger from '../services/logger';
import entities from './orm.entities';
import migrations from './orm.migrations';
import subscribers from './orm.subscribers';

// Config from env
interface EnvConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  migrate: boolean;
}

const envConfig: EnvConfig = {
  host: process.env.POSTGRES_HOST || '',
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USERNAME || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || '',
  migrate: process.env.POSTGRES_MIGRATE === 'true',
};

// Environment
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

// SSL PEM for Amazon RDS
const readPEM = () => {
  const path = './src/config/certs/rds-ca-2019-root.pem';
  return fs.readFileSync(path).toString();
};

const ormConfig: ConnectionOptions = {
  entities,
  migrations,
  subscribers,
  type: 'postgres',
  host: envConfig.host,
  port: envConfig.port,
  username: envConfig.username,
  password: envConfig.password,
  database: envConfig.database,
  migrationsRun: envConfig.migrate,
  ssl: isProduction ? { ca: readPEM() } : true,
  poolErrorHandler: logger.error,
  synchronize: !isProduction,
  logging: false,
};

export = ormConfig;
