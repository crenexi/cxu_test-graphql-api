import User from './User';
import ShipModel from './ShipModel';
import ShipIdentity from './ShipIdentity';
import ShipSpecs from './ShipSpecs';
import ShipSpinoff from './ShipSpinoff';
import Manufacturer from './Manufacturer';

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
