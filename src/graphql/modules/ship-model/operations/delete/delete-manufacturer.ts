import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { InternalInputError } from '@common/errors';
import { Manufacturer } from '@root/entities';
import { getIdentitiesCount } from '../get';

import { messages } from '../../constants';

type DeleteManufacturer = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteManufacturer: DeleteManufacturer = async (conn, { id }) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);

  // Prevent deletion if identities exist
  const identitiesCount = await getIdentitiesCount(conn, { manufacturerId: id });

  if (identitiesCount) {
    throw new InternalInputError(messages.deleteIdentitiesFirst);
  }

  // Cleared to delete manufacturer
  return dbTryCatch<string>(async () => {
    await manufacturerRepo.delete(id);
    return id;
  });
};
