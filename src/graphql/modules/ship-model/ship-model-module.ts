import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { ConnModule } from '../conn';
import { ShipModelProvider } from './providers';

import {
  ShipModelResolver,
  ShipIdentityResolver,
  ManufacturerResolver,
} from './resolvers';

const resolvers = [
  ShipModelResolver,
  ShipIdentityResolver,
  ManufacturerResolver,
];

export const ShipModelModule = new GraphQLModule({
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