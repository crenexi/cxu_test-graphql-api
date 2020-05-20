import { Resolver, Query, Mutation, Arg, ID, Int } from 'type-graphql';
import { ShipSpinoff } from '@root/entities';
import { ShipModelProvider } from '../providers';

import { CreateShipSpinoffInput } from '../operations/create';
import { UpdateShipSpinoffInput } from '../operations/update';

@Resolver(() => ShipSpinoff)
export class ShipSpinoffResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => Int)
  shipSpinoffsCount(
    @Arg('modelId', () => ID, { nullable: true }) modelId: string,
  ): Promise<number> {
    return this.shipModelProvider.getSpinoffsCount(modelId);
  }

  @Mutation(() => ID)
  createShipSpinoff(
    @Arg('modelId', () => ID) modelId: string,
    @Arg('input') input: CreateShipSpinoffInput,
  ): Promise<string> {
    return this.shipModelProvider.createSpinoff(modelId, input);
  }

  @Mutation(() => ID)
  updateShipSpinoff(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UpdateShipSpinoffInput,
  ): Promise<string> {
    return this.shipModelProvider.updateSpinoff(id, input);
  }

  @Mutation(() => ID)
  deleteShipSpinoff(@Arg('id', () => ID) id: string): Promise<string> {
    return this.shipModelProvider.deleteSpinoff(id);
  }
}
