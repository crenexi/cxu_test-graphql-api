import { Connection } from 'typeorm';
import { inputTryCatch, dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';
import { CreateShipModelInput } from '../../types/inputs';

type CreateShipModel = (
  conn: Connection,
  payload: { input: CreateShipModelInput },
) => Promise<ShipModel>;

export const createShipModel: CreateShipModel = async (conn, { input }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  const { specsInput, ...restInput } = input;

  // Create ship specs
  const shipSpecs = await inputTryCatch<ShipSpecs>(async () => {
    return shipSpecsRepo.create(specsInput);
  });

  // Create ship model
  const shipModel = await inputTryCatch<ShipModel>(async () => {
    return shipModelRepo.create({
      ...restInput,
      specsId: shipSpecs.id,
    });
  });

  // Save entities
  return dbTryCatch(async () => {
    await shipSpecsRepo.save(shipSpecs);
    return shipModelRepo.save(shipModel);
  });
};
