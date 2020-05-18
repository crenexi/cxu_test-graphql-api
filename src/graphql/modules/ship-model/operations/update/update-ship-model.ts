import { Connection } from 'typeorm';
import isEmpty from 'lodash.isempty';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { ShipModel, ShipSpecs } from '@root/entities';
import { UpdateShipModelInput } from './update-ship-model-input';
import { UpdateShipSpecsInput } from './update-ship-specs-input';
import { messages } from '../../constants';

type UpdateShipModel = (
  conn: Connection,
  payload: {
    id: string;
    input: UpdateShipModelInput;
  },
) => Promise<ShipModel>;

export const updateShipModel: UpdateShipModel = async (conn, { id, input }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  const { specsInput, ...restInput } = input;

  await dbTryCatch<ShipModel>(async () => {
    // Update specs, if applicable
    if (specsInput && !isEmpty(specsInput)) {
      const { id: specsId } = await shipModelRepo.findOneOrFail(id);
      await shipSpecsRepo.save({ id: specsId, ...specsInput });
    }

    // Update model, if applicable
    if (!isEmpty(restInput)) {
      await shipModelRepo.save({ id, ...restInput });
    }

    // Updated ship model
  });
};

/*
    // Create ship specs
    if (specs) {
      const specs = shipSpecsRepo.create(shipSpecs);
      await shipSpecsRepo.save(specs);
    }

    // Create ship model
    const shipModel = {
      ...restInput,
      specsId: specs.id,
    };
    const model = this.shipModelRepo.create(shipModel);
    const savedModel = await model.save();

    // Updated ship model
    return savedModel;
*/
