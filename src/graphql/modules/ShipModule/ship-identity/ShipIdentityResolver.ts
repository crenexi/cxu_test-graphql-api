import { Resolver } from 'type-graphql';

@Resolver()
class ShipIdentityResolver {
  async shipIdentities() {
    return [];
  }
}

export default ShipIdentityResolver;
