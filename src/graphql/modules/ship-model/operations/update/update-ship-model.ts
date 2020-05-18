export const updateShipModel = async () => {
  // TODO
};

/** Update ship model */
/*
async updateModel(
  input: UpdateShipModelInput,
): Promise<ShipModel> {
  try {
    const { shipModelRepo, shipSpecsRepo } = this;
    const { specs: shipSpecs, ...restInput } = input;

    // Create ship specs
    if (specs) {
      const specs = shipSpecsRepo.create(shipSpecs);
      await shipSpecsRepo.save(specs);
    }

    // Create ship model
    const shipModel = {
      ...restInput,
      specsId: specs.id,
    };
    const model = this.shipModelRepo.create(shipModel);
    const savedModel = await model.save();

    // Updated ship model
    return savedModel;
  } catch (err) {
    throw Error('Failed to update ship model');
  }
}
*/
