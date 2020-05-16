import { GraphQLModule } from '@graphql-modules/core';
import { Session, AppModuleConfig, AppModuleContext } from '@common/types';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
// import { ShipModelModule } from './modules/ship-model';
import { ConnModule } from './modules/conn';

const featureModules = [
  UserModule,
  // ShipModelModule,
];

export const AppModule = new GraphQLModule<AppModuleConfig, Session, AppModuleContext>({
  name: 'App',
  configRequired: true,
  imports: ({ config: { conn } }) => [
    AuthModule.forRoot({ conn }),
    ConnModule.forRoot({ conn }),
    ...featureModules,
  ],
  context: ({ req }) => ({
    url: `${req.protocol}://${req.get('host')}`,
  }),
});

// import buildLoaders from './graphql/build-loaders';
// context: ({ req, res }): Context => ({
//   req,
//   res,
//   // ...buildLoaders(),
// }),
// redis in context
