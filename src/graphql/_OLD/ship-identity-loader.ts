// import DataLoader from 'dataloader';
// import ShipIdentity from './ShipIdentity';
// import { orderLoadedData } from '../../helpers';

// type BatchShipIdentity = (ids: readonly string[]) => Promise<ShipIdentity[]>;

// const batchShipIdentities: BatchShipIdentity = async (readOnlyIds) => {
//   const ids = [...readOnlyIds];

//   const ShipIdentities = await ShipIdentity.findByIds(ids);
//   return orderLoadedData({ ids, items: ShipIdentities });
// };

// export default () => (
//   new DataLoader<string, ShipIdentity>(batchShipIdentities)
// );
