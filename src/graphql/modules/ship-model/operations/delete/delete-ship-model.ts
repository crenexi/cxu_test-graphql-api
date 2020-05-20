import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { ShipModel, ShipSpecs, ShipSpinoff } from '@root/entities';
import { messages } from '../../constants';

type DeleteShipModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteShipModel: DeleteShipModel = async (conn, { id }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);
  const shipSpinoffRepo = conn.getRepository(ShipSpinoff);

  const spinoffCount = await dbTryCatch<number>(async () => {
    return shipSpinoffRepo.count({ modelId: id });
  });

  // Prevent deletion if spinoffs exist
  if (spinoffCount) {
    throw new InternalInputError(messages.deleteSpinoffsFirst);
  }

  // Cleared to delete model
  return dbTryCatch<string>(async () => {
    const { specsId } = await shipModelRepo.findOneOrFail(id);

    // Delete ship model, then specs
    await shipModelRepo.delete(id);
    await shipSpecsRepo.delete(specsId);
    return id;
  });
};
