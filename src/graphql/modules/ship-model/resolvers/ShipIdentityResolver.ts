import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { ShipModelProvider } from '../providers';
import { ShipIdentityResult } from '../types/results';

@Resolver(() => ShipModel)
class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels(): Promise<ShipModel[]> {
    return this.shipModelProvider.getIdentities();
  }

  @Query(() => ShipIdentityResult)
  shipModel(@Arg('id') id: string): Promise<typeof ShipIdentityResult> {
    return this.shipModelProvider.getIdentity(id);
  }
}

export default ShipModelResolver;
