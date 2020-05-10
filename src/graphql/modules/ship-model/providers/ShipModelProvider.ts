import { getRepository } from 'typeorm';
import { Injectable } from '@graphql-modules/di';
import { ShipModel, ShipIdentity, Manufacturer } from '../../../entities';
import { ShipModelResult, ShipIdentityResult } from '../types/results';

@Injectable()
export default class ShipModelProvider {
  constructor() {
    this.shipRepository
  }

  const userRepository = getRepository(User);

  /** Get ship models */
  async getModels(): Promise<ShipModel[]> {
    return [];
  }

  /** Get ship model */
  async getModel(id: string): Promise<typeof ShipModelResult> {
    return {
      message: `Ship model deleted | id: ${id} `,
    };
  }

  /** Get manufacturers */
  async getManufacturers(): Promise<Manufacturer[]> {
    return [];
  }

  /** Get manufacturer */
  async getManufacturer(id: string): Promise<Manufacturer | undefined> {
    return undefined;
  }
}
