import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { ShipModel } from '../../../../entities';

@Resolver(() => ShipModel)
export default class ShipModelResolver {
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
