// import DataLoader from 'dataloader';
// import ShipModel from './ShipModel';
// import { orderLoadedData } from '../../helpers';

// type BatchShipModel = (ids: readonly string[]) => Promise<ShipModel[]>;

// const batchShipModels: BatchShipModel = async (readOnlyIds) => {
//   const ids = [...readOnlyIds];

//   const ShipModels = await ShipModel.findByIds(ids);
//   return orderLoadedData({ ids, items: ShipModels });
// };

// export default () => (
//   new DataLoader<string, ShipModel>(batchShipModels)
// );
