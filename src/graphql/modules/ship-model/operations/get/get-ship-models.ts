import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';

type GetShipModels = (conn: Connection) => Promise<ShipModel[]>;

export const getShipModels: GetShipModels = (conn) => {
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
