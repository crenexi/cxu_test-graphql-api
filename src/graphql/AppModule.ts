import { GraphQLModule } from '@graphql-modules/core';
import { ShipModule } from './modules/ship';

const AppModule = new GraphQLModule({
  imports: [
    ShipModule,
  ],
});

export default AppModule;
