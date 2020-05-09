import { Resolver, Query, Arg } from 'type-graphql';
import ShipProvider from '../ShipProvider';
import ShipModel from './ShipModel';

@Resolver(() => ShipModel)
class ShipModelResolver {
  constructor(private shipProvider: ShipProvider) {
    this.shipProvider = shipProvider;
  }

  @Query(() => [ShipModel])
  shipModels() {
    return this.shipProvider.getShipModels();
  }

  @Query(() => ShipModel)
  shipModel(@Arg('id') id: string) {
    return this.shipProvider.getShipModel(id);
  }
}

export default ShipModelResolver;
