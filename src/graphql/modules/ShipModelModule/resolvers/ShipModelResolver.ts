import { Resolver, Query, Arg } from 'type-graphql';
import { ShipModelProvider } from '../providers';
import { ShipModel } from '../../../models';

@Resolver(() => ShipModel)
export default class ShipModelResolver {
  constructor(private spinoffProvider: ShipModelProvider) {
    this.spinoffProvider = spinoffProvider;
  }

  @Query(() => [ShipModel])
  shipModels() {
    return this.spinoffProvider.find();
  }

  @Query(() => ShipModel)
  shipModel(@Arg('id') id: string) {
    return this.spinoffProvider.findOne(id);
  }
}
