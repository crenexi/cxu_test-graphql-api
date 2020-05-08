import { Manufacturer } from '../graphql/modules/manufacturer';
import { ShipIdentity } from '../graphql/modules/ship-identity';
import { ShipModel } from '../graphql/modules/ship-model';
import { ShipSpinoff } from '../graphql/modules/ship-spinoff';

const entities: Function[] = [
  Manufacturer,
  ShipIdentity,
  ShipModel,
  ShipSpinoff,
];

export default entities;
