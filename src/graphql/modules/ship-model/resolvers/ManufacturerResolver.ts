import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Manufacturer } from '@root/entities';
import { ShipModelProvider } from '../providers';
import { CreateManufacturerInput } from '../types/inputs';
import { ManufacturerResult } from '../types/results';

@Resolver(() => Manufacturer)
class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [Manufacturer])
  manufacturers(): Promise<Manufacturer[]> {
    return this.shipModelProvider.getManufacturers();
  }

  @Query(() => ManufacturerResult)
  manufacturer(@Arg('id') id: string): Promise<typeof ManufacturerResult> {
    return this.shipModelProvider.getManufacturer(id);
  }

  @Mutation(() => Manufacturer)
  createManufacturer(
    @Arg('input') input: CreateManufacturerInput,
  ): Promise<Manufacturer> {
    return this.shipModelProvider.createManufacturer(input);
  }
}

export default ManufacturerResolver;
