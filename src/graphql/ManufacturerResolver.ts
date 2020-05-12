import { Resolver } from 'type-graphql';

@Resolver()
class ManufacturerResolver {
  async manufacturers() {
    return [];
  }
}

export default ManufacturerResolver;
