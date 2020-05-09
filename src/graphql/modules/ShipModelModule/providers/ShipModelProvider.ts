import { Injectable } from '@graphql-modules/di';
import { ShipModel, ShipIdentity, Manufacturer } from '../../../models';

@Injectable()
export default class ShipModelProvider {
  findModels(): ShipModel[] {
    return [];
  }

  findModel(id: string): ShipModel | Error {
    return id;
  }
}
