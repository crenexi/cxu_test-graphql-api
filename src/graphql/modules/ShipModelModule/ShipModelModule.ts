import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { ShipModelProvider } from './providers';
import { ShipModelResolver } from './resolvers';

const resolvers = [
  ShipModelResolver,
];

const ShipModelModule = new GraphQLModule({
  name: 'ShipModelModule',
  providers: [
    ShipModelProvider,
    ...resolvers,
  ],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => context.injector,
    }),
  ],
});

export default ShipModelModule;
