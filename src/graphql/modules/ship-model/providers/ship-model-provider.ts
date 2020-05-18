import { Connection, Repository } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import {
  ShipModel,
  ShipIdentity,
  ShipSpecs,
  Manufacturer,
} from '@root/entities';
import { messages } from '../constants';

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  private shipModelRepo: Repository<ShipModel>;
  private shipIdentityRepo: Repository<ShipIdentity>;
  private shipSpecsRepo: Repository<ShipSpecs>;
  private manufacturerRepo: Repository<Manufacturer>;

  constructor(private conn: Connection) {
    this.shipModelRepo = conn.getRepository(ShipModel);
    this.shipIdentityRepo = conn.getRepository(ShipIdentity);
    this.shipSpecsRepo = conn.getRepository(ShipSpecs);
    this.manufacturerRepo = conn.getRepository(Manufacturer);
  }
  /** Update ship model */
  async updateModel(
    input: UpdateShipModelInput,
  ): Promise<ShipModel> {
    try {
      const { shipModelRepo, shipSpecsRepo } = this;
      const { specs: shipSpecs, ...restInput } = input;

      // Create ship specs
      if (specs) {
        const specs = shipSpecsRepo.create(shipSpecs);
        await shipSpecsRepo.save(specs);
      }

      // Create ship model
      const shipModel = {
        ...restInput,
        specsId: specs.id,
      };
      const model = this.shipModelRepo.create(shipModel);
      const savedModel = await model.save();

      // Updated ship model
      return savedModel;
    } catch (err) {
      throw Error('Failed to update ship model');
    }
  }

  /** Get ship identities */
  async getIdentities(): Promise<ShipIdentity[]> {
    return this.shipIdentityRepo.find();
  }

  /** Get ship identity */
  async getIdentity(id: string): Promise<typeof ShipIdentityResult> {
    const identity = await this.shipIdentityRepo.findOne(id);

    return identity || ({
      notFoundNotice: messages.undefinedIdentity,
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
}
