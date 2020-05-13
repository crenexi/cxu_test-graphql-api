import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { ShipModelProvider } from '../providers';

@Resolver(() => ShipModel)
class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels(): Promise<ShipModel[]> {
    return this.shipModelProvider.getModels();
  }

  @Query(() => ShipModel)
  shipModel(@Arg('id') id: string): Promise<ShipModel | false> {
    return this.shipModelProvider.getModel(id);
  }
}

export default ShipModelResolver;
