import { Resolver, Query, Mutation, Int, ID } from 'type-graphql';
import { ShipSpecs } from '@root/entities';
import { ShipModelProvider } from '../providers';

@Resolver(() => ShipSpecs)
export class ShipSpecsResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => Int)
  shipSpecsCount(): Promise<number> {
    return this.shipModelProvider.specsCount();
  }

  @Mutation(() => [ID])
  deleteOrphanedShipSpecs(): Promise<string[]> {
    return this.shipModelProvider.deleteOrphanedSpecs();
  }
}