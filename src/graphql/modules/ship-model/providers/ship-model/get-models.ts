export const getModels = async (
  shipModelRepo: Repository<ShipModel>,
): Promise<ShipModel[]> => {
  return dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('shipModel')
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getMany();
  });
};
