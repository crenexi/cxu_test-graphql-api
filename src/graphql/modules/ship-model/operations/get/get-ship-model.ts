import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel } from '@root/entities';
import { ShipModelResult } from '@graphql/common/results';
import { messages } from '../../constants';

type GetShipModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<typeof ShipModelResult>;

export const getShipModel: GetShipModel = async (conn, { id }) => {
  const shipModelRepo = conn.getRepository(ShipModel);

  const model = await dbTryCatch<ShipModel | undefined>(() => {
    return shipModelRepo
      .createQueryBuilder('model')
      .where('model.id = :id', { id })
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
      .getOne();
  });

  // ShipModel or WarnNotFound
  return model || ({
    notFoundNotice: messages.undefinedModel,
  });
};
