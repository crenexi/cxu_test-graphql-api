import { Resolver } from 'type-graphql';

@Resolver()
class ShipModelResolver {
  async shipModels() {
    return [];
  }
}

export default ShipModelResolver;
