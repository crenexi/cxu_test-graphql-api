import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { Manufacturer } from '@root/entities';
import { ManufacturerResult } from '@graphql/common/results';
import { messages } from '../../constants';

type GetManufacturer = (
  conn: Connection,
  payload: { id: string },
) => Promise<typeof ManufacturerResult>;

export const getManufacturer: GetManufacturer = async (conn, { id }) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);

  const manufacturer = await dbTryCatch(() => {
    return manufacturerRepo.findOne(id);
  });

  // Manufacturer or WarnNotFound
  return manufacturer || ({
    notFoundNotice: messages.undefinedManufacturer,
  });
};
