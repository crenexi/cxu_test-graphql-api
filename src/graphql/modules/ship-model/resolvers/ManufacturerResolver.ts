import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { Manufacturer } from '../../../models';

@Resolver()
export default class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [Manufacturer])
  shipModels() {
    return this.shipModelProvider.findManufacturers();
  }

  @Query(() => Manufacturer)
  shipModel(@Arg('id') id: string) {
    return this.shipModelProvider.findManufacturer(id);
  }
}

/types/exceptions/ShipResponse

/modules/ships/types/inputs/
/modules/ships/types/responses/
/modules/ships/types/args/

User {
  ships: {

  }
}






import { ShipModelResponse } from '@types/responses'
import { ShipModelResponse } from '../../../ship-model/responses';

User {
  ship: ShipModelResponse[]
}

Event {
  needs: ShipModelResponse[]
}
