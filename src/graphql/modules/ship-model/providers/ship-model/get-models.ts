import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';

type GetModels = (conn: Connection) => Promise<ShipModel[]>;

export const getModels: GetModels = async (conn) => {
  const shipModelRepo = conn.getRepository(ShipModel);

  return dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('shipModel')
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getMany();
  });
};
