import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipSpinoff } from '@root/entities';
import { UpdateShipSpinoffInput } from './update-ship-spinoff-input';

type UpdateShipSpinoff = (
  conn: Connection,
  payload: {
    id: string;
    input: UpdateShipSpinoffInput;
  },
) => Promise<string>;

export const updateShipSpinoff: UpdateShipSpinoff = async (conn, { id, input }) => {
  const shipSpinoffRepo = conn.getRepository(ShipSpinoff);

  return dbTryCatch<string>(async () => {
    await shipSpinoffRepo.update({ id }, input);

    // Success: return ID
    return id;
  });
};
