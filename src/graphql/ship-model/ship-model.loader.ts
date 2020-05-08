import DataLoader from 'dataloader';
import ShipModel from '../../models/ShipModel';
import { orderLoaderRes } from '../../helpers';

type BatchShipModel = (ids: readonly string[]) => Promise<ShipModel[]>;
type ShipModelMap = { [key: string]: ShipModel };

const batchShipModels: BatchShipModel = async (readOnlyIds) => {
  const ids = [...readOnlyIds];

  const ShipModels = await ShipModel.findByIds(ids);
  return orderLoaderRes({ ids, items: ShipModels });
};

export default () => (
  new DataLoader<string, ShipModel>(batchShipModels)
);
