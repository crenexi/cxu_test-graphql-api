import { Injectable } from '@graphql-modules/di';

@Injectable()
class ShipSpinoffProvider {
  find() {
    return [];
  }

  findOne(id: string) {
    return id;
  }
}

export default ShipSpinoffProvider;
