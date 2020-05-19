import { Resolver } from 'type-graphql';
// import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Manufacturer } from '@root/entities';
// import { ManufacturerResult } from '@graphql/common/results';
import { ShipModelProvider } from '../providers';
// import { CreateManufacturerInput } from '../types/inputs';

@Resolver(() => Manufacturer)
export class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  // @Query(() => [Manufacturer])
  // manufacturers(): Promise<Manufacturer[]> {
  //   return this.shipModelProvider.getManufacturers();
  // }

  // @Query(() => ManufacturerResult)
  // manufacturer(@Arg('id') id: string): Promise<typeof ManufacturerResult> {
  //   return this.shipModelProvider.getManufacturer(id);
  // }

  // @Mutation(() => Manufacturer)
  // createManufacturer(
  //   @Arg('input') input: CreateManufacturerInput,
  // ): Promise<Manufacturer> {
  //   return this.shipModelProvider.createManufacturer(input);
  // }
}
