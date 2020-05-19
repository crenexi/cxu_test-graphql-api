import { Resolver } from 'type-graphql';
// import { Resolver, Query, Arg } from 'type-graphql';
import { ShipIdentity } from '@root/entities';
// import { ShipIdentityResult } from '@graphql/common/results';
import { ShipModelProvider } from '../providers';

@Resolver(() => ShipIdentity)
export class ShipIdentityResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  // @Query(() => [ShipIdentity])
  // shipIdentities(): Promise<ShipIdentity[]> {
  //   return this.shipModelProvider.getIdentities();
  // }

  // @Query(() => ShipIdentityResult)
  // shipIdentity(@Arg('id') id: string): Promise<typeof ShipIdentityResult> {
  //   return this.shipModelProvider.getIdentity(id);
  // }
}
