import { Connection } from 'typeorm';
import { GraphQLModule } from '@graphql-modules/core';
import { AuthorizationModule } from './modules/authorization';
import { ShipModelModule } from './modules/ship-model';
import { emitSchemaDefinition } from './helpers';

const generalModules = [
  ShipModelModule,
];

export interface AppModuleConfig {
  conn: Connection;
}

const AppModule = new GraphQLModule<AppModuleConfig>({
  name: 'AppModule',
  configRequired: true,
  imports: ({ config }) => {
    const { conn } = config;

    return [
      AuthorizationModule.forRoot({ conn }),
      ...generalModules,
    ];
  },
});

emitSchemaDefinition(AppModule.schema);

export default AppModule;
