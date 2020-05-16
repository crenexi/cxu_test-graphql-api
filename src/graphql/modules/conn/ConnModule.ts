import { GraphQLModule } from '@graphql-modules/core';
import { Connection } from 'typeorm';
import { AppModuleConfig as Config } from '@common/types';

export const ConnModule = new GraphQLModule<Config>({
  name: 'Conn',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
  ],
});
