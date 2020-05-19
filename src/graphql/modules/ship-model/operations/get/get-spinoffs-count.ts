import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipSpinoff } from '@root/entities';

type GetSpinoffsCount = (
  conn: Connection,
  payload: { modelId: string | undefined },
) => Promise<number>;

export const getSpinoffsCount: GetSpinoffsCount = async (conn, { modelId }) => {
  const spinoffRepo = conn.getRepository(ShipSpinoff);

  return dbTryCatch<number>(() => {
    // Count all spinoffs
    if (!modelId) return spinoffRepo.count();

    // Count spinoffs of a particular model
    return spinoffRepo
      .createQueryBuilder('spinoff')
      .where('spinoff.model_id = :id', { modelId })
      .getCount();
  });
};
