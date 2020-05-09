import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import ShipSpinoffProvider from './ShipSpinoffProvider';
import ShipSpinoffResolver from './ShipSpinoffResolver';

// Types
import { Chat } from './chat.type';

// Resolvers

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
