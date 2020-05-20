import { Connection } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { ShipModel, ShipSpecs, Manufacturer } from '@root/entities';
import { ShipModelResult, ManufacturerResult } from '@graphql/common/results';

import {
  getShipModels,
  getShipModel,
  getSpinoffsCount,
  getIdentitiesCount,
  getManufacturers,
  getManufacturer,
} from '../operations/get';

import {
  CreateShipModelInput,
  CreateShipSpinoffInput,
  CreateManufacturerInput,
  createShipModel,
  createShipSpinoff,
  createManufacturer,
} from '../operations/create';

import {
  UpdateShipModelInput,
  UpdateShipSpinoffInput,
  UpdateManufacturerInput,
  updateShipModel,
  updateShipSpinoff,
  updateManufacturer,
} from '../operations/update';

import {
  deleteShipModel,
  deleteShipSpinoff,
  deleteOrphanedShipSpecs,
  deleteManufacturer,
} from '../operations/delete';

// Ship model types
type GetModelsCount = () => Promise<number>;
type GetModels = () => Promise<ShipModel[]>;
type GetModel = (id: string) => Promise<typeof ShipModelResult>;
type CreateModel = (input: CreateShipModelInput) => Promise<string>;
type UpdateModel = (id: string, input: UpdateShipModelInput) => Promise<string>;
type DeleteModel = (id: string) => Promise<string>;

// Ship specs types
type GetSpecsCount = () => Promise<number>;
type DeleteOrphanedSpecs = () => Promise<string[]>;

// Ship spinoff types
type GetSpinoffsCount = (modelId?: string) => Promise<number>;
type CreateSpinoff = (modelId: string, input: CreateShipSpinoffInput) => Promise<string>;
type UpdateSpinoff = (id: string, input: UpdateShipSpinoffInput) => Promise<string>;
type DeleteSpinoff = (id: string) => Promise<string>;

// Ship identity types
type GetIdentitiesCount = (manufacturerId?: string) => Promise<number>;

// Manufacturer types
type GetManufacturers = () => Promise<Manufacturer[]>;
type GetManufacturer = (id: string) => Promise<typeof ManufacturerResult>;
type CreateManufacturer = (input: CreateManufacturerInput) => Promise<string>;
type UpdateManufacturer = (id: string, input: UpdateManufacturerInput) => Promise<string>;
type DeleteManufacturer = (id: string) => Promise<string>;

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  /** Model: count */
  getModelsCount: GetModelsCount = () => {
    return this.conn.getRepository(ShipModel).count();
  };

  /** Model: get all */
  getModels: GetModels = () => {
    return getShipModels(this.conn);
  };

  /** Model: get one */
  getModel: GetModel = (id) => {
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
  getSpecsCount: GetSpecsCount = () => {
    return this.conn.getRepository(ShipSpecs).count();
  };

  /** Specs: deletes specs with no associated model */
  deleteOrphanedSpecs: DeleteOrphanedSpecs = () => {
    return deleteOrphanedShipSpecs(this.conn);
  };

  /** Spinoff: count */
  getSpinoffsCount: GetSpinoffsCount = (modelId) => {
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
  getIdentitiesCount: GetIdentitiesCount = (manufacturerId) => {
    return getIdentitiesCount(this.conn, { manufacturerId });
  };

  /** Manufacturer: get all */
  getManufacturers: GetManufacturers = () => {
    return getManufacturers(this.conn);
  };

  /** Manufacturer: get one */
  getManufacturer: GetManufacturer = (id) => {
    return getManufacturer(this.conn, { id });
  };

  /** Manufacturer: create */
  createManufacturer: CreateManufacturer = (input) => {
    return createManufacturer(this.conn, { input });
  };

  /** Manufacturer: update */
  updateManufacturer: UpdateManufacturer = (id, input) => {
    return updateManufacturer(this.conn, { id, input });
  };

  /** Manufacturer: delete */
  deleteManufacturer: DeleteManufacturer = (id) => {
    return deleteManufacturer(this.conn, { id });
  };
}
