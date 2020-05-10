import Manufacturer from './Manufacturer';
import ShipIdentity from './ShipIdentity';
import ShipModel from './ShipModel';
import ShipSpinoff from './ShipSpinoff';

// Entites for Postgres
export const entities = [
  Manufacturer,
  ShipIdentity,
  ShipModel,
  ShipSpinoff,
];

// Schemas for GraphQL
export {
  Manufacturer,
  ShipIdentity,
  ShipModel,
  ShipSpinoff,
};
