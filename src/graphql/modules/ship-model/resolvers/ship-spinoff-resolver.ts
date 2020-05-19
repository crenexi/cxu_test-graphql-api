import { Resolver, Query, Arg, ID, Int } from 'type-graphql';
import { ShipSpinoff } from '@root/entities';
import { ShipModelProvider } from '../providers';

@Resolver(() => ShipSpinoff)
export class ShipSpinoffResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => Int)
  shipSpinoffsCount(
    @Arg('modelId', () => ID, { nullable: true }) modelId: string,
  ): Promise<number> {
    return this.shipModelProvider.spinoffsCount(modelId);
  }
}
