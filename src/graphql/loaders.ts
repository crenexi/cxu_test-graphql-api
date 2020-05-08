import DataLoader from 'dataloader';
import { ShipIdentity, shipIdentityLoader } from './ship-identity';
import { ShipModel, shipModelLoader } from './ship-model';

interface DataLoaders {
  shipIdentityLoader: DataLoader<string, ShipIdentity>;
  shipModelLoader: DataLoader<string, ShipModel>;
}

const loaders = (): DataLoaders => ({
  shipIdentityLoader: shipIdentityLoader(),
  shipModelLoader: shipModelLoader(),
});

export default loaders;
