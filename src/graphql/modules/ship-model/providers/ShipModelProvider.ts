import { Connection, Repository } from 'typeorm';
import { Injectable } from '@graphql-modules/di';
import { ShipModel, Manufacturer } from '../../../entities';

@Injectable()
export default class ShipModelProvider {
  private shipModelRepo: Repository<ShipModel>;
  private manufacturerRepo: Repository<Manufacturer>;

  constructor(private conn: Connection) {
    this.shipModelRepo = conn.getRepository(ShipModel);
    this.manufacturerRepo = conn.getRepository(Manufacturer);
  }

  /** Get ship models */
  async getModels(): Promise<ShipModel[]> {
    return this.shipModelRepo.find();
  }

  /** Get ship model */
  async getModel(id: string): Promise<ShipModel | false> {
    return await this.shipModelRepo.findOne(id) || false;
  }

  /** Get manufacturers */
  async getManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepo.find();
  }

  /** Get manufacturer */
  async getManufacturer(id: string): Promise<Manufacturer | false> {
    return await this.manufacturerRepo.findOne(id) || false;
  }
}
