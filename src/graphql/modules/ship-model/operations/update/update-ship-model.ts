import { Connection } from 'typeorm';
import isEmpty from 'lodash.isempty';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';
import { UpdateShipModelInput } from './update-ship-model-input';

type UpdateShipModel = (
  conn: Connection,
  payload: {
    id: string;
    input: UpdateShipModelInput;
  },
) => Promise<string>;

export const updateShipModel: UpdateShipModel = async (conn, { id, input }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  const { specsInput, ...restInput } = input;

  return dbTryCatch<string>(async () => {
    // Update specs, if applicable
    if (specsInput && !isEmpty(specsInput)) {
      const { specsId } = await shipModelRepo.findOneOrFail(id);
      await shipSpecsRepo.update({ id: specsId }, specsInput);
    }

    // Update model, if applicable
    if (!isEmpty(restInput)) {
      await shipModelRepo.update({ id }, restInput);
    }

    // Success: return ID
    return id;
  });
};
