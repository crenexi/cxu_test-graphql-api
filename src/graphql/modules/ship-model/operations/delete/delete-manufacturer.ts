import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { Manufacturer, ShipIdentity } from '@root/entities';
import { messages } from '../../constants';

type DeleteManufacturer = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteManufacturer: DeleteManufacturer = async (conn, { id }) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);
  const shipIdentityRepo = conn.getRepository(ShipIdentity);

  const identityCount = await dbTryCatch<number>(() => {
    return shipIdentityRepo.count({ manufacturerId: id });
  });
};
