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

// import {
//   updateShipModel,
//   UpdateShipModelInput,
// } from '../operations/update';

import {
  deleteShipModel,
} from '../operations/delete';

type Models = () => Promise<ShipModel[]>;
type Model = (id: string) => Promise<typeof ShipModelResult>;
type CreateModel = (input: CreateShipModelInput) => Promise<ShipModel>;
// type UpdateModel = (input: UpdateShipModelInput) => Promise<ShipModel>;
type DeleteModel = (id: string) => Promise<void>;

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  models: Models = () => {
    return getShipModels(this.conn);
  };

  model: Model = (id) => {
    return getShipModel(this.conn, { id });
  };

  createModel: CreateModel = (input) => {
    return createShipModel(this.conn, { input });
  };

  // updateModel: UpdateModel = (input: UpdateShipModelInput) => {
  //   return updateShipModel();
  // }

  deleteModel: DeleteModel = (id) => {
    return deleteShipModel(this.conn, { id });
  };

  // async getIdentities(): Promise<ShipIdentity[]> {
  //   return this.shipIdentityRepo.find();
  // }

  // async getIdentity(id: string): Promise<typeof ShipIdentityResult> {
  //   const identity = await this.shipIdentityRepo.findOne(id);

  //   return identity || ({
  //     notFoundNotice: messages.undefinedIdentity,
  //   });
  // }

  // async getManufacturers(): Promise<Manufacturer[]> {
  //   return this.manufacturerRepo.find();
  // }

  // async getManufacturer(id: string): Promise<typeof ManufacturerResult> {
  //   const manufacturer = await this.manufacturerRepo.findOne(id);

  //   return manufacturer || ({
  //     notFoundNotice: messages.undefinedManufacturer,
  //   });
  // }

  // async createManufacturer(
  //   input: CreateManufacturerInput,
  // ): Promise<Manufacturer> {
  //   try {
  //     return this.manufacturerRepo.create(input).save();
  //   } catch (err) {
  //     const message = `Failed to create manufacturer '${input.name}'`;
  //     throw Error(message);
  //   }
  // }
}
