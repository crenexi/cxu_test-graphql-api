import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { Manufacturer } from '@root/entities';

type GetManufacturers = (conn: Connection) => Promise<Manufacturer[]>;

export const getManufacturers: GetManufacturers = (conn) => {
  const manufacturerRepo = conn.getRepository(Manufacturer);

  return dbTryCatch(() => {
    return manufacturerRepo.find();
  });
};
