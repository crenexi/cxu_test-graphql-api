import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { ShipModel, ShipSpecs } from '@root/entities';
import { getSpinoffsCount } from '../get';
import { messages } from '../../constants';

type DeleteShipModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteShipModel: DeleteShipModel = async (conn, { id }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  // Prevent deletion if spinoffs exist
  const spinoffCount = await getSpinoffsCount(conn, { modelId: id });

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
