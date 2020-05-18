import { Connection } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { ShipModel } from '@root/entities';
import { ShipModelResult } from '@root/entities/results';

import {
  getShipModels,
  getShipModel,
} from '../operations/get';

import {
  createShipModel,
  CreateShipModelInput,
} from '../operations/create';

import {
  updateShipModel,
  UpdateShipModelInput,
} from '../operations/update';

import {
  deleteShipModel,
} from '../operations/delete';

type Models = () => Promise<ShipModel[]>;
type Model = (id: string) => Promise<typeof ShipModelResult>;
type CreateModel = (input: CreateShipModelInput) => Promise<ShipModel>;
// type UpdateModel = (input: UpdateShipModelInput) => Promise<ShipModel>;
type DeleteModel = (id: string) => void;

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  /** Model: get */
  models: Models = () => getShipModels(this.conn);

  /** Model: get one */
  model: Model = id => getShipModel(this.conn, { id });

  /** Model: create */
  createModel: CreateModel = (input) => {
    return createShipModel(this.conn, { input });
  };

  /** Model: update */
  // updateModel: UpdateModel = (input: UpdateShipModelInput) => {
  //   return updateShipModel();
  // }

  /** Model: delete */
  deleteModel: DeleteModel = id => deleteShipModel();

  }

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
