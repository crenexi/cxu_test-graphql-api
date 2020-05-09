import { Injectable } from '@graphql-modules/di';

@Injectable()
export default class ShipModelProvider {
  find() {
    return [];
  }

  findOne(id: string) {
    return id;
  }
}
