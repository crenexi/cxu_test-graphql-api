import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { Manufacturer } from '@root/entities';
import { ManufacturerResult } from '@graphql/common/results';
import { ShipModelProvider } from '../providers';

import { CreateManufacturerInput } from '../operations/create';
import { UpdateManufacturerInput } from '../operations/update';

@Resolver(() => Manufacturer)
export class ManufacturerResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [Manufacturer])
  manufacturers(): Promise<Manufacturer[]> {
    return this.shipModelProvider.getManufacturers();
  }

  @Query(() => ManufacturerResult)
  manufacturer(@Arg('id', () => ID) id: string): Promise<typeof ManufacturerResult> {
    return this.shipModelProvider.getManufacturer(id);
  }

  @Mutation(() => ID)
  createManufacturer(
    @Arg('input') input: CreateManufacturerInput,
  ): Promise<string> {
    return this.shipModelProvider.createManufacturer(input);
  }

  @Mutation(() => ID)
  updateManufacturer(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UpdateManufacturerInput,
  ): Promise<string> {
    return this.shipModelProvider.updateManufacturer(id, input);
  }

  @Mutation(() => ID)
  deleteManufacturer(@Arg('id', () => ID) id: string): Promise<string> {
    return this.shipModelProvider.deleteManufacturer(id);
  }
}
