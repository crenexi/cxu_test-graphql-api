import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import ShipProvider from './ShipProvider';

// Types
import { Chat } from './chat.type';

// Resolvers
import { ShipModelResolver } from './ship-model';

const resolvers = [
  ShipModelResolver,
];

const ShipModule = new GraphQLModule({
  providers: [ShipProvider, ...resolvers],
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
