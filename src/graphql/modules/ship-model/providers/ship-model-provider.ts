import { Connection } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { ShipModel } from '@root/entities';
import { CreateShipModelInput } from '../types/inputs';
import { ShipModelResult } from '../types/results';

import { getModels } from './ship-model/get-models';
import { getModel } from './ship-model/get-model';
import { createModel } from './ship-model/create-model';
import { updateModel } from './ship-model/update-model';
import { deleteModel } from './ship-model/delete-model';

interface ShipModelProviderShape {
  getModels: () => Promise<ShipModel[]>;
  getModel: (id: string) => Promise<typeof ShipModelResult>;
}

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider implements ShipModelProviderShape {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  /** Get models */
  getModels = () => getModels(this.conn);

  /** Get model */
  getModel = (id: string) => getModel(this.conn, { id });

  /** Create model */
  createModel = (input: CreateShipModelInput) => {
    return createModel(this.conn, { input });
  };

  // Ship model: UPDATE
  // updateModel = () => {
  //   return updateModel();
  // };

  // Ship model: DELETE
  // deleteModel = () => deleteModel();

  /*
  async getIdentities(): Promise<ShipIdentity[]> {
    return this.shipIdentityRepo.find();
  }

  async getIdentity(id: string): Promise<typeof ShipIdentityResult> {
    const identity = await this.shipIdentityRepo.findOne(id);

    return identity || ({
      notFoundNotice: messages.undefinedIdentity,
    });
  }

  async getManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepo.find();
  }

  async getManufacturer(id: string): Promise<typeof ManufacturerResult> {
    const manufacturer = await this.manufacturerRepo.findOne(id);

    return manufacturer || ({
      notFoundNotice: messages.undefinedManufacturer,
    });
  }

  async createManufacturer(
    input: CreateManufacturerInput,
  ): Promise<Manufacturer> {
    try {
      return this.manufacturerRepo.create(input).save();
    } catch (err) {
      const message = `Failed to create manufacturer '${input.name}'`;
      throw Error(message);
    }
  }
  */
}
