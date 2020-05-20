import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipIdentity } from '@root/entities';

type GetIdentitiesCount = (
  conn: Connection,
  payload: { manufacturerId: string | undefined },
) => Promise<number>;

export const getIdentitiesCount: GetIdentitiesCount = async (conn, { manufacturerId }) => {
  const identitiesRepo = conn.getRepository(ShipIdentity);

  return dbTryCatch<number>(() => {
    // Count all identities
    if (!manufacturerId) return identitiesRepo.count();

    // Count identities of a particular manufacturer
    return identitiesRepo
      .createQueryBuilder('identity')
      .where('identity.manufacturer_id = :manufacturerId', { manufacturerId })
      .getCount();
  });
};
