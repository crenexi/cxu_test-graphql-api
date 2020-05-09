import { GraphQLModule } from '@graphql-modules/core';
import ShipModelModule from './modules/ShipModelModule';

const AppModule = new GraphQLModule({
  name: 'AppModule',
  imports: [
    ShipModelModule,
  ],
});

export default AppModule;
