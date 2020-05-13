import { Connection } from 'typeorm';
import { GraphQLModule } from '@graphql-modules/core';
import {
  Session,
  AppModuleConfig as Config,
  AppModuleContext as Context,
} from '@root/types';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { ShipModelModule } from './modules/ship-model';

const featureModules = [
  UserModule,
  ShipModelModule,
];

const AppModule = new GraphQLModule<Config, Session, Context>({
  name: 'App',
  configRequired: true,
  providers: ({ config: { conn } }) => [
    { provide: Connection, useValue: conn },
  ],
  imports: ({ config: { conn } }) => [
    AuthModule.forRoot({ conn }),
    ...featureModules,
  ],
  context: ({ req }) => ({
    url: `${req.protocol}://${req.get('host')}`,
  }),
});

export default AppModule;

// import buildLoaders from './graphql/build-loaders';
// context: ({ req, res }): Context => ({
//   req,
//   res,
//   // ...buildLoaders(),
// }),
// redis in context
