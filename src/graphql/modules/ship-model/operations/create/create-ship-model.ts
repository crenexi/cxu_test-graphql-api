import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';
import { CreateShipModelInput } from './create-ship-model-input';

type CreateShipModel = (
  conn: Connection,
  payload: { input: CreateShipModelInput },
) => Promise<string>;

export const createShipModel: CreateShipModel = async (conn, { input }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  const { specsInput, ...restInput } = input;

  return dbTryCatch(async () => {
    // Create ship specs
    const { id: specsId } = await shipSpecsRepo.save(specsInput);

    // Create ship model
    const shipModel = await shipModelRepo.save({ specsId, ...restInput });

    // Success: return ID
    return shipModel.id;
  });
};
