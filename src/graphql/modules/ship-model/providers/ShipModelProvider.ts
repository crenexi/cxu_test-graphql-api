import { Injectable } from '@graphql-modules/di';
import { ShipModel, ShipIdentity, Manufacturer } from '../../../entities';

import {
  ShipModelResult,
  // ShipIdentityResult,
  // ManufacturerResult,
} from '../types/results';

@Injectable()
export default class ShipModelProvider {
  getModels(): ShipModel[] {
    return [];
  }

  async getModel(id: string): Promise<typeof ShipModelResult> {
    return {
      message: `Ship model deleted | id: ${id} `,
    };
  }
}
