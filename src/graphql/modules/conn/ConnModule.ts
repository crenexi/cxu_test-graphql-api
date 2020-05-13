import { GraphQLModule } from '@graphql-modules/core';
import { Connection } from 'typeorm';
import { AppModuleConfig as Config } from '@root/types';

const ConnModule = new GraphQLModule<Config>({
  name: 'Conn',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
  ],
});

export default ConnModule;
