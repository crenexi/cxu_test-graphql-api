import { Resolver, Query, Mutation, Arg, ID, Int } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { ShipModelResult } from '@graphql/common/results';
import { ShipModelProvider } from '../providers';

import { CreateShipModelInput } from '../operations/create';
import { UpdateShipModelInput } from '../operations/update';

@Resolver(() => ShipModel)
export class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => Int)
  shipModelsCount(): Promise<number> {
    return this.shipModelProvider.getModelsCount();
  }

  @Query(() => [ShipModel])
  shipModels(): Promise<ShipModel[]> {
    return this.shipModelProvider.getModels();
  }

  @Query(() => ShipModelResult)
  shipModel(@Arg('id', () => ID) id: string): Promise<typeof ShipModelResult> {
    return this.shipModelProvider.getModel(id);
  }

  @Mutation(() => ID)
  createShipModel(
    @Arg('input') input: CreateShipModelInput,
  ): Promise<string> {
    return this.shipModelProvider.createModel(input);
  }

  @Mutation(() => ID)
  updateShipModel(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UpdateShipModelInput,
  ): Promise<string> {
    return this.shipModelProvider.updateModel(id, input);
  }

  @Mutation(() => ID)
  deleteShipModel(@Arg('id', () => ID) id: string): Promise<string> {
    return this.shipModelProvider.deleteModel(id);
  }
}
