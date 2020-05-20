import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipSpecs } from '@root/entities';

type DeleteOrphanedShipSpecs = (conn: Connection) => Promise<string[]>;

export const deleteOrphanedShipSpecs: DeleteOrphanedShipSpecs = async (conn) => {
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  return dbTryCatch<string[]>(async () => {
    const orphanedSpecs = await shipSpecsRepo
      .createQueryBuilder('specs')
      .leftJoin(
        'specs.model',
        'model',
        'model.specs_id = specs.id',
      )
      .where('model is null')
      .getMany();

    // Bulk delete
    const ids = orphanedSpecs.map(s => s.id);
    await shipSpecsRepo.delete(ids);

    // Success: return IDs
    return ids;
  });
};