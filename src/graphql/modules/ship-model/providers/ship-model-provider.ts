import { Connection } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { ShipModel, ShipSpecs } from '@root/entities';
import { ShipModelResult } from '@graphql/common/results';

import {
  getShipModels,
  getShipModel,
  getSpinoffsCount,
  getIdentitiesCount,
} from '../operations/get';

import {
  createShipModel,
  CreateShipModelInput,
  createShipSpinoff,
  CreateShipSpinoffInput,
} from '../operations/create';

import {
  updateShipModel,
  UpdateShipModelInput,
  updateShipSpinoff,
  UpdateShipSpinoffInput,
} from '../operations/update';

import {
  deleteShipModel,
  deleteShipSpinoff,
  deleteOrphanedShipSpecs,
} from '../operations/delete';

// Ship model types
type ModelsCount = () => Promise<number>;
type Models = () => Promise<ShipModel[]>;
type Model = (id: string) => Promise<typeof ShipModelResult>;
type CreateModel = (input: CreateShipModelInput) => Promise<string>;
type UpdateModel = (id: string, input: UpdateShipModelInput) => Promise<string>;
type DeleteModel = (id: string) => Promise<string>;

// Ship specs types
type SpecsCount = () => Promise<number>;
type DeleteOrphanedSpecs = () => Promise<string[]>;

// Ship spinoff types
type SpinoffsCount = (modelId?: string) => Promise<number>;
type CreateSpinoff = (modelId: string, input: CreateShipSpinoffInput) => Promise<string>;
type UpdateSpinoff = (id: string, input: UpdateShipSpinoffInput) => Promise<string>;
type DeleteSpinoff = (id: string) => Promise<string>;

// Ship identity types
type IdentitiesCount = (manufacturerId?: string) => Promise<number>;

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  /** Model: count */
  modelsCount: ModelsCount = () => {
    return this.conn.getRepository(ShipModel).count();
  };

  /** Model: get all */
  models: Models = () => {
    return getShipModels(this.conn);
  };

  /** Model: get one */
  model: Model = (id) => {
    return getShipModel(this.conn, { id });
  };

  /** Model: create */
  createModel: CreateModel = (input) => {
    return createShipModel(this.conn, { input });
  };

  /** Model: update */
  updateModel: UpdateModel = (id, input) => {
    return updateShipModel(this.conn, { id, input });
  };

  /** Model: delete */
  deleteModel: DeleteModel = (id) => {
    return deleteShipModel(this.conn, { id });
  };

  /** Specs: count */
  specsCount: SpecsCount = () => {
    return this.conn.getRepository(ShipSpecs).count();
  };

  /** Specs: deletes specs with no associated model */
  deleteOrphanedSpecs: DeleteOrphanedSpecs = () => {
    return deleteOrphanedShipSpecs(this.conn);
  };

  /** Spinoff: count */
  spinoffsCount: SpinoffsCount = (modelId) => {
    return getSpinoffsCount(this.conn, { modelId });
  };

  /** Spinoff: create */
  createSpinoff: CreateSpinoff = (modelId, input) => {
    return createShipSpinoff(this.conn, { modelId, input });
  };

  /** Spinoff: update */
  updateSpinoff: UpdateSpinoff = (id, input) => {
    return updateShipSpinoff(this.conn, { id, input });
  };

  /** Spinoff: delete */
  deleteSpinoff: DeleteSpinoff = (id) => {
    return deleteShipSpinoff(this.conn, { id });
  };

  /** Identity: count */
  identitiesCount: IdentitiesCount = (manufacturerId) => {
    return getIdentitiesCount(this.conn, { manufacturerId });
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
