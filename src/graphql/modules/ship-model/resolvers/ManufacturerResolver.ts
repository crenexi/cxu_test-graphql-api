import { Resolver, Query, Arg } from 'type-graphql';
import { Manufacturer } from '@root/entities';
import { ShipModelProvider } from '../providers';

@Resolver(() => Manufacturer)
export default class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [Manufacturer])
  manufacturers(): Promise<Manufacturer[]> {
    return this.shipModelProvider.getManufacturers();
  }

  @Query(() => Manufacturer)
  manufacturer(@Arg('id') id: string): Promise<Manufacturer | false> {
    return this.shipModelProvider.getManufacturer(id);
  }
}
