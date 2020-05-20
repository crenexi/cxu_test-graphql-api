import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { Manufacturer } from '@root/entities';
import { UpdateManufacturerInput } from './update-manufacturer-input';

type UpdateManufacturer = (
  conn: Connection,
  payload: {
    id: string;
    input: UpdateManufacturerInput;
  },
) => Promise<string>;

export const updateManufacturer: UpdateManufacturer = async (conn, { id, input }) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);

  return dbTryCatch<string>(async () => {
    // Update manufacturer
    await manufacturerRepo.update({ id }, input);

    // Success: return ID
    return id;
  });
};
