import { Connection, Repository } from 'typeorm';
import { ShipModel, Manufacturer } from '@root/entities';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { messages } from '../constants';
import { CreateManufacturerInput } from '../types/inputs';
import { ShipModelResult, ManufacturerResult } from '../types/results';

@Injectable({ scope: ProviderScope.Session })
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
  async getModel(id: string): Promise<typeof ShipModelResult> {
    const model = await this.shipModelRepo.findOne(id);

    return model || ({
      notFoundNotice: messages.undefinedModel,
    });
  }

  /** Get manufacturers */
  async getManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepo.find();
  }

  /** Get manufacturer */
  async getManufacturer(id: string): Promise<typeof ManufacturerResult> {
    const manufacturer = await this.manufacturerRepo.findOne(id);

    return manufacturer || ({
      notFoundNotice: messages.undefinedManufacturer,
    });
  }

  /** Create manufacturer */
  async createManufacturer(input: CreateManufacturerInput): Promise<Manufacturer> {
    return this.manufacturerRepo.save(input as Manufacturer);
  }
}

export default ShipModelProvider;
