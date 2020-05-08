import DataLoader from 'dataloader';
import ShipIdentity from '../../models/ShipIdentity';
import { orderLoaderRes } from '../../helpers';

type BatchShipIdentity = (ids: readonly string[]) => Promise<ShipIdentity[]>;
type ShipIdentityMap = { [key: string]: ShipIdentity };

const batchShipIdentities: BatchShipIdentity = async (readOnlyIds) => {
  const ids = [...readOnlyIds];

  const ShipIdentities = await ShipIdentity.findByIds(ids);
  return orderLoaderRes({ ids, items: ShipIdentities });
};

export default () => (
  new DataLoader<string, ShipIdentity>(batchShipIdentities)
);
