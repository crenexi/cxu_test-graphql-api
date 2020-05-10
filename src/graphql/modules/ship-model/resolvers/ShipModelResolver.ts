import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { ShipModel } from '../../../entities';

@Resolver()
export default class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels() {
    return this.shipModelProvider.getModel();
  }

  @Query(() => ShipModel)
  shipModel(@Arg('id') id: string) {
    return this.shipModelProvider.getModel(id);
  }
}
