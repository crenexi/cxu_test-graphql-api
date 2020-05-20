import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipSpinoff } from '@root/entities';
import { InternalInputError } from '@common/errors';
import { CreateShipSpinoffInput } from './create-ship-spinoff-input';
import { messages } from '../../constants';

type CreateShipSpinoff = (
  conn: Connection,
  payload: {
    modelId: string;
    input: CreateShipSpinoffInput;
  },
) => Promise<string>;

export const createShipSpinoff: CreateShipSpinoff = async (conn, payload) => {
  const { modelId, input } = payload;
  const shipSpinoffRepo = conn.getRepository(ShipSpinoff);

  if (!modelId) {
    throw new InternalInputError(messages.missingModelId);
  }

  return dbTryCatch<string>(async () => {
    const spinoff = await shipSpinoffRepo.save({ modelId, ...input });

    // Success: return ID
    return spinoff.id;
  });
};
