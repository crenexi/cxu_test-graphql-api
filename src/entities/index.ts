import { User } from './user';
import { ShipModel } from './ship-model';
import { ShipIdentity } from './ship-identity';
import { ShipSpecs } from './ship-specs';
import { ShipSpinoff } from './ship-spinoff';
import { Manufacturer } from './manufacturer';

// Entites for Postgres
export const entities = [
  User,
  ShipModel,
  ShipIdentity,
  ShipSpecs,
  ShipSpinoff,
  Manufacturer,
];

// Schemas for GraphQL
export {
  User,
  ShipModel,
  ShipIdentity,
  ShipSpecs,
  ShipSpinoff,
  Manufacturer,
};
