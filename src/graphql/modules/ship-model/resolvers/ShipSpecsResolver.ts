import { Resolver, Query, Arg } from 'type-graphql';
import { ShipSpecs } from '@root/entities';
import { ShipModelProvider } from '../providers';
import { ShipSpecsResult } from '../types/results';

@Resolver(() => ShipSpecs)
class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => ShipSpecsResult)
  shipSpecs(@Arg('id') id: string): Promise<typeof ShipSpecsResult> {
    return this.shipModelProvider.getSpecs(id);
  }
}

export default ShipModelResolver;
