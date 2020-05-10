import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { Manufacturer } from '../../../entities';

@Resolver()
export default class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [Manufacturer])
  manufacturers() {
    return this.shipModelProvider.getManufacturers();
  }

  @Query(() => Manufacturer)
  manufacturer(@Arg('id') id: string) {
    return this.shipModelProvider.getManufacturer(id);
  }
}
