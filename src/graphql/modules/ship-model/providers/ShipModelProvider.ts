import { Injectable } from '@graphql-modules/di';
import { ShipModel, ShipIdentity, Manufacturer } from '../../../entities';

import {
  ShipModelResult,
  // ShipIdentityResult,
  // ManufacturerResult,
} from '../types/results';

@Injectable()
export default class ShipModelProvider {
  findModels(): ShipModel[] {
    return [];
  }

  findModel(id: string): ShipModel | Error {
    return id;
  }
}
