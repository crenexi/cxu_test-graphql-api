import { CookieOptions } from 'express';

export interface AppConfig {
  paths: {
    [key: string]: string;
  };
  prodOrigins: string[];
  env: string;
  isProduction: boolean;
  isDevelopment: boolean;
  debugging: boolean;
  port: number;
  secret: string;
  auth: {
    cookieName: string;
    cookieOpts: CookieOptions;
    accessSecret: string;
    refreshSecret: string;
  };
  postgres: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  orm: {
    autoMigrate: boolean;
    logging: boolean;
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

const appConfig: AppConfig = {
  paths: {
    '@app': 'src/app',
    '@gql': 'src/graphql',
    '@modules': 'src/graphql/modules',
    '@config': 'src/config',
    '@types': 'src/types/*',
    '@entities': 'src/entities',
    '@helpers': 'src/helpers',
    '@services': 'src/services',
  },
  prodOrigins: [
    'https://www.webbuniverse.com',
    'https://dev.webbuniverse.com',
    'https://admin.webbuniverse.com',
  ],
  env: nodeEnv,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  debugging: !!process.env.DEBUG,
  port: parseInt(process.env.PORT as string, 10) || 3000,
  secret: process.env.SESSION_SECRET || 'Avengers Assemble',
  auth: {
    cookieName: 'avengersAssemble',
    cookieOpts: {
      path: '/',
      httpOnly: true,
      secure: nodeEnv === 'production',
    },
    accessSecret: process.env.ACCESS_TOKEN_SECRET || 'Avengers Assemble',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'Avengers Assemble',
  },
  postgres: {
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
    database: process.env.POSTGRES_DATABASE || '',
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASSWORD || '',
  },
  orm: {
    autoMigrate: process.env.ORM_MIGRATE === 'true',
    logging: process.env.ORM_LOGGING === 'true',
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT || '', 10) || 6379,
    host: 'localhost',
  },
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID || '',
  },
};

export default appConfig;
