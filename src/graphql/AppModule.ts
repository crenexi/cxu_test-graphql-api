import { GraphQLModule } from '@graphql-modules/core';
import {
  Session,
  AppModuleConfig as Config,
  AppModuleContext as Context,
} from '../types';
import { AuthModule } from './modules/auth';
import { ShipModelModule } from './modules/ship-model';
// import { emitSchemaDefinition } from './helpers';

const featureModules = [
  ShipModelModule,
];

const AppModule = new GraphQLModule<Config, Session, Context>({
  name: 'App',
  configRequired: true,
  imports: ({ config: { conn } }) => [
    AuthModule.forRoot({ conn }),
    ...featureModules,
  ],
  context: ({ req }) => ({
    url: `${req.protocol}://${req.get('host')}`,
  }),
});

// Emits schema via helper
// emitSchemaDefinition(AppModule.schema);

export default AppModule;

// import buildLoaders from './graphql/build-loaders';
// context: ({ req, res }): Context => ({
//   req,
//   res,
//   // ...buildLoaders(),
// }),
// redis in context
