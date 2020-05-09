import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { ShipModelProvider } from './providers';
import { ShipModelResolver } from './resolvers';

const resolvers = [
  // ShipModelResolver,
];

const ShipModule = new GraphQLModule({
  providers: [ShipModelProvider, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => {
        return ShipModule.injector.getSessionInjector(context);
      },
    }),
  ],
});

export default ShipModule;
