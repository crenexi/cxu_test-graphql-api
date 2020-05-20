import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { Manufacturer } from '@root/entities';
import { CreateManufacturerInput } from './create-manufacturer-input';

type CreateManufacturer = (
  conn: Connection,
  payload: { input: CreateManufacturerInput },
) => Promise<string>;

export const createManufacturer: CreateManufacturer = async (conn, { input }) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);

  return dbTryCatch<string>(async () => {
    // Create manufacturer
    const manufacturer = await manufacturerRepo.save(input);

    // Success: return ID
    return manufacturer.id;
  });
};
