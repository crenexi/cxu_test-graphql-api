import User from './User';
import ShipModel from './ShipModel';
import ShipIdentity from './ShipIdentity';
import ShipSpinoff from './ShipSpinoff';
import Manufacturer from './Manufacturer';

// Entites for Postgres
export const entities = [
  User,
  ShipModel,
  ShipIdentity,
  ShipSpinoff,
  Manufacturer,
];

// Schemas for GraphQL
export {
  User,
  ShipModel,
  ShipIdentity,
  ShipSpinoff,
  Manufacturer,
};
