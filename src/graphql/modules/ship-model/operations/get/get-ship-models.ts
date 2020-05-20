import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel } from '@root/entities';

type GetShipModels = (conn: Connection) => Promise<ShipModel[]>;

export const getShipModels: GetShipModels = (conn) => {
  const shipModelRepo = conn.getRepository(ShipModel);

  return dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('model')
      // Model specs
      .leftJoinAndSelect(
        'model.specs',
        'specs',
        'specs.id = model.specs_id',
      )
      // Model spinoffs
      .leftJoinAndSelect(
        'model.spinoffs',
        'spinoff',
        'spinoff.model_id = model.id',
      )
      .getMany();
  });
};
