import { GraphQLModule } from '@graphql-modules/core';
import { ShipModelModule } from './modules/ship-model';
import { emitSchemaDefinition } from './helpers';

const AppModule = new GraphQLModule({
  name: 'AppModule',
  imports: [
    ShipModelModule,
  ],
});

emitSchemaDefinition(AppModule.schema);

export default AppModule;
