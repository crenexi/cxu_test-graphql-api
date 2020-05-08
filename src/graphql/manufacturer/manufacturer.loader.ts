import DataLoader from 'dataloader';
import Manufacturer from '../../models/Manufacturer';
import { orderLoaderRes } from '../../helpers';

type BatchManufacturer = (ids: readonly string[]) => Promise<Manufacturer[]>;
type ManufacturerMap = { [key: string]: Manufacturer };

const batchManufacturers: BatchManufacturer = async (readOnlyIds) => {
  const ids = [...readOnlyIds];

  const manufacturers = await Manufacturer.findByIds(ids);
  return orderLoaderRes({ ids, items: manufacturers });
};

export default () => (
  new DataLoader<string, Manufacturer>(batchManufacturers)
);
