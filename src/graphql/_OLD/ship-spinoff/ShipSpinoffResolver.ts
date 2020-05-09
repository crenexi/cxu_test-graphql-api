import { Resolver, Query, Arg } from 'type-graphql';
import ShipSpinoffProvider from './ShipSpinoffProvider';
import ShipSpinoff from './ShipSpinoff';

@Resolver(() => ShipSpinoff)
class ShipSpinoffResolver {
  constructor(private spinoffProvider: ShipSpinoffProvider) {
    this.spinoffProvider = spinoffProvider;
  }

  @Query(() => [ShipSpinoff])
  shipModels() {
    return this.spinoffProvider.find();
  }

  @Query(() => ShipSpinoff)
  shipModel(@Arg('id') id: string) {
    return this.spinoffProvider.findOne(id);
  }
}

export default ShipSpinoffResolver;
