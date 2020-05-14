import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { ShipModelProvider } from '../providers';
import { CreateShipModelInput } from '../types/inputs';
import { ShipModelResult } from '../types/results';

@Resolver(() => ShipModel)
class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels(): Promise<ShipModel[]> {
    return this.shipModelProvider.getModels();
  }

  @Query(() => ShipModelResult)
  shipModel(@Arg('id') id: string): Promise<typeof ShipModelResult> {
    return this.shipModelProvider.getModel(id);
  }

  @Mutation(() => ShipModel)
  createShipModel(
    @Arg('input') input: CreateShipModelInput,
  ): Promise<ShipModel> {
    return this.shipModelProvider.createModel(input);
  }
}

export default ShipModelResolver;
