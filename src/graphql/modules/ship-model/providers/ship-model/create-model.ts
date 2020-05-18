export const createModel = async(
  input: CreateShipModelInput,
): Promise<ShipModel> {
  const { specsInput, ...restInput } = input;

  // Create ship specs
  const shipSpecs = await inputTryCatch<ShipSpecs>(async () => {
    return this.shipSpecsRepo.create(specsInput);
  });

  // Create ship model
  const shipModel = await inputTryCatch<ShipModel>(async () => {
    return this.shipModelRepo.create({
      ...restInput,
      specsId: shipSpecs.id,
    });
  });

  // Save entities
  return dbTryCatch(async () => {
    await this.shipSpecsRepo.save(shipSpecs);
    return this.shipModelRepo.save(shipModel);
  });
};
