import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { ConnModule } from '../conn';
import { ShipModelProvider } from './providers';

import {
  ShipModelResolver,
  ManacturerResolver,
} from './resolvers';

const resolvers = [
  ShipModelResolver,
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
