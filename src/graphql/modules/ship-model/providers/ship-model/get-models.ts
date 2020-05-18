import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';

export const getModels = async (conn: Connection): Promise<ShipModel[]> => {
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
