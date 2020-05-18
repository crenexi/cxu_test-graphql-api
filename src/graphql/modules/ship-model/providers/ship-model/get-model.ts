import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';
import { ShipModelResult } from '../../types/results';
import { messages } from '../../constants';

export const getModel = async (
  conn: Connection,
  id: string,
): Promise<typeof ShipModelResult> => {
  const shipModelRepo = conn.getRepository(ShipModel);

  const model = await dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('shipModel')
      .where('shipModel.id = :id', { id })
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getOne();
  });

  // Undefined model
  return model || ({
    notFoundNotice: messages.undefinedModel,
  });
};
