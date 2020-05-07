interface ServerConfig {
  env: string;
  isProduction: boolean;
  isDevelopment: boolean;
  debugging: boolean;
  port: number;
  secret: string;
  postgres: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    migrate: boolean;
  };
  redis: {
    port: number;
    host: string;
  };
  contentful: {
    spaceId: string;
  };
}

const nodeEnv = process.env.NODE_ENV || 'development';

const serverConfig: ServerConfig = {
  env: nodeEnv,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  debugging: !!process.env.DEBUG,
  port: parseInt(process.env.PORT as string, 10) || 3000,
  secret: process.env.SESSION_SECRET || 'Avengers Assemble',
  postgres: {
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
    database: process.env.POSTGRES_DATABASE || '',
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASSWORD || '',
    migrate: process.env.POSTGRES_MIGRATE === 'true',
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT || '', 10) || 6379,
    host: 'localhost',
  },
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID || '',
  },
};

export default serverConfig;
