import { Resolver, Query } from 'type-graphql';
import Manufacturer from './Manufacturer';

@Resolver()
class ManufacturerResolver {
  @Query(() => [Manufacturer])
  manufacturers() {
    return Manufacturer.find();
  }
}

export default ManufacturerResolver;
