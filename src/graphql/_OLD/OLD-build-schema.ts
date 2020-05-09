import { buildSchema } from 'type-graphql';

// Resolver imports
import { ManufacturerResolver } from './modules/manufacturer';
import { ShipIdentity } from './modules/ship-identity';
import { ShipModel } from './modules/ship-model';
import { ShipSpinoff } from './modules/ship-spinoff';

const resolvers: Function[] = [
  ManufacturerResolver,
  ShipIdentity,
  ShipModel,
  ShipSpinoff,
];

export default () => buildSchema({
  resolvers,
  scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
});
