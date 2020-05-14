import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { ConnModule } from '../conn';
import { ShipModelProvider } from './providers';

import {
  ShipModelResolver,
  ShipIdentityResolver,
  ManacturerResolver,
} from './resolvers';

const resolvers = [
  ShipModelResolver,
  ShipIdentityResolver,
  ManacturerResolver,
];

const ShipModelModule = new GraphQLModule({
  name: 'ShipModel',
  imports: [ConnModule],
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
