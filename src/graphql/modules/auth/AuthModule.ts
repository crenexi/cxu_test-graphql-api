import { GraphQLModule } from '@graphql-modules/core';
import { Connection } from 'typeorm';
import { AppModuleConfig as Config } from '@root/types';
import { AuthProvider } from './providers';

const AuthModule = new GraphQLModule<Config>({
  name: 'Auth',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
    AuthProvider,
  ],
});

export default AuthModule;
