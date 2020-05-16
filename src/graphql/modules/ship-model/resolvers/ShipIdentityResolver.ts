import { Resolver, Query, Arg } from 'type-graphql';
import { ShipIdentity } from '@root/entities';
import { ShipModelProvider } from '../providers';
import { ShipIdentityResult } from '../types/results';

@Resolver(() => ShipIdentity)
export class ShipIdentityResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipIdentity])
  shipIdentities(): Promise<ShipIdentity[]> {
    return this.shipModelProvider.getIdentities();
  }

  @Query(() => ShipIdentityResult)
  shipIdentity(@Arg('id') id: string): Promise<typeof ShipIdentityResult> {
    return this.shipModelProvider.getIdentity(id);
  }
}
