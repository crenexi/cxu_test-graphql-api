import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipSpinoff } from '@root/entities';

type DeleteShipSpinoff = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteShipSpinoff: DeleteShipSpinoff = async (conn, { id }) => {
  const shipSpinoffRepo = conn.getRepository(ShipSpinoff);

  return dbTryCatch<string>(async () => {
    await shipSpinoffRepo.delete(id);

    // Success: return ID
    return id;
  });
};
