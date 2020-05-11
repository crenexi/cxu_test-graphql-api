import { GraphQLModule } from '@graphql-modules/core';
import { Connection } from 'typeorm';
import { AppModuleConfig as Config } from '../../../types';
import { AuthorizationProvider } from './providers';

const AuthorizationModule = new GraphQLModule<Config>({
  name: 'Authorization',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
  ],
  AuthorizationProvider,
});

export default AuthorizationModule;
