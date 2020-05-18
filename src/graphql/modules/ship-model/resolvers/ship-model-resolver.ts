import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { ShipModelResult } from '@root/entities/results';
import { ShipModelProvider } from '../providers';

import { CreateShipModelInput } from '../operations/create';
import { UpdateShipModelInput } from '../operations/update';

@Resolver(() => ShipModel)
export class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels(): Promise<ShipModel[]> {
    return this.shipModelProvider.models();
  }

  @Query(() => ShipModelResult)
  shipModel(@Arg('id') id: string): Promise<typeof ShipModelResult> {
    return this.shipModelProvider.model(id);
  }

  @Mutation(() => )
  createShipModel(
    @Arg('input') input: CreateShipModelInput,
  ): Promise<string> {
    return this.shipModelProvider.createModel(input);
  }

  @Mutation(() => ShipModel)
  updateShipModel(
    @Arg('id') id: string,
    @Arg('input') input: UpdateShipModelInput,
  ): Promise<ShipModel> {
    return this.shipModelProvider.updateModel(id, input);
  }

  @Mutation()
  deleteShipModel(@Arg('id') id: string): Promise<void> {
    return this.shipModelProvider.deleteModel(id);
  }
}
