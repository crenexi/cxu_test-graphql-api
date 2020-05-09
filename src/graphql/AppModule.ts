import { GraphQLModule } from '@graphql-modules/core';
import { ShipModelModule } from './modules/ship-model';

const AppModule = new GraphQLModule({
  imports: [
    ShipModelModule,
  ],
});

export default AppModule;
