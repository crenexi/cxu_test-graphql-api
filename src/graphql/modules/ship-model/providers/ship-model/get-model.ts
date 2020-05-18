export const getModel = async (
  shipModelRepo: Repository<ShipModel>,
  id: string,
): Promise<typeof ShipModelResult> => {
  const model = await dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('shipModel')
      .where('shipModel.id = :id', { id })
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getOne();
  });

  // Undefined model
  return model || ({
    notFoundNotice: messages.undefinedModel,
  });
};

