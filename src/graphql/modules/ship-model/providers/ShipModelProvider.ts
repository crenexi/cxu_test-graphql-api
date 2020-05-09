import { Injectable } from '@graphql-modules/di';

@Injectable()
class ShipModelProvider {
  find() {
    return [];
  }

  findOne(id: string) {
    return id;
  }
}

export default ShipModelProvider;
