import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { ShipModel } from '../../../entities';
import { ShipModelResult } from '../types/results';

@Resolver()
export default class ShipModelResolver {
  constructor(private shipModelProvider: ShipModelProvider) {
    this.shipModelProvider = shipModelProvider;
  }

  @Query(() => [ShipModel])
  shipModels() {
    return this.shipModelProvider.getModels();
  }

  @Query(() => ShipModelResult)
  shipModel(@Arg('id') id: string) {
    return this.shipModelProvider.getModel(id);
  }
}
