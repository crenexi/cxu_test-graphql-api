import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { ShipModel, ShipSpecs } from '@root/entities';
import { messages } from '../../constants';

type DeleteShipModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<void>;

export const deleteShipModel: DeleteShipModel = async (conn, { id }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  return dbTryCatch<void>(async () => {
    const shipModel = await shipModelRepo.findOne(id);

    // Ensure ship model exists
    if (!shipModel) {
      throw new InternalInputError(messages.undefinedModel);
    }

    // Delete ship model, then specs
    await shipModelRepo.delete(id);
    await shipSpecsRepo.delete(shipModel.specsId);
  });
};
