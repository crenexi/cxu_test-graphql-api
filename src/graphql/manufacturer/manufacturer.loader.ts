import dataLoader from 'dataloader';
import Manufacturer from '../../models/Manufacturer';
import { orderLoaderRes } from '../../helpers';

type BatchManufacturer = (ids: string[]) => Promise<Manufacturer[]>;
type ManufacturerMap = { [key: string]: Manufacturer };

const batchManufacturers: BatchManufacturer = async (ids) => {
  // 1. Get data
  const manufacturers = await Manufacturer.findByIds(ids);

  return orderLoaderRes();

  // 2. Create map
  const manufacturerMap: ManufacturerMap =
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);

const userMap: { [key: string]: User } = {};
users.forEach(u => {
  userMap[u.id] = u;
});

return ids.map(id => userMap[id]);
