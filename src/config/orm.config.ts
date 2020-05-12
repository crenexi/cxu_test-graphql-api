import { ConnectionOptions } from 'typeorm';
import fs from 'fs';
import logger from '../services/logger';
import { entities } from '../entities';
import { migrations, subscribers } from '../typeorm';
import config from './app.config';

// Config from env
interface EnvConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const envConfig: EnvConfig = {
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
};

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
  ssl: config.isProduction ? { ca: readPEM() } : undefined,
  poolErrorHandler: logger.error,
  synchronize: !config.isProduction,
  logging: config.orm.logging || ['error'],
};

export = ormConfig;
