import { Connection, Repository } from 'typeorm';
import { ShipModel, Manufacturer } from '@root/entities';
import { Injectable } from '@graphql-modules/di';
import { messages } from '../constants';
import { CreateManufacturerInput } from '../types/inputs';
import { ManufacturerResult } from '../types/results';


@Injectable()
class ShipModelProvider {
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
  async getManufacturer(id: string): Promise<typeof ManufacturerResult> {
    const manufacturer = await this.manufacturerRepo.findOne(id);

    if (!manufacturer) {
      return {
        notFoundNotice: messages.undefinedManufacturer,
      };
    }

    return manufacturer;
  }

  /** Create manufacturer */
  async createManufacturer(input: CreateManufacturerInput): Promise<Manufacturer> {
    return this.manufacturerRepo.save(input as Manufacturer);
  }
}

export default ShipModelProvider;
