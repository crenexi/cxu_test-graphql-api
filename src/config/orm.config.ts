import SuperHero from '../entity/SuperHero';
import SuperPower from '../entity/SuperPower';

// All entities
const entities = [
  SuperHero,
  SuperPower,
];

const ormConfig = {
  entities,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, // default postgres port
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  logging: true,
  synchronize: true,
};

export default ormConfig;
