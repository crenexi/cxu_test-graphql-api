import { GraphQLModule } from '@graphql-modules/core';
import { Connection } from 'typeorm';
import { AppModuleConfig as Config } from '@common/types';
import { AuthProvider } from './providers';

export const AuthModule = new GraphQLModule<Config>({
  name: 'Auth',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
    AuthProvider,
  ],
});
