import { Connection, Repository } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
// import {  } from '@common/errors';
import {
  ShipModel,
  ShipIdentity,
  ShipSpecs,
  Manufacturer,
} from '@root/entities';
import { messages } from '../constants';
import {
  CreateShipModelInput,
  CreateManufacturerInput,
} from '../types/inputs';
import {
  ShipModelResult,
  ShipIdentityResult,
  ManufacturerResult,
} from '../types/results';

@Injectable({ scope: ProviderScope.Session })
class ShipModelProvider {
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

  /** Create ship model */
  async createModel(
    input: CreateShipModelInput,
  ): Promise<true> {
    try {
      const { specs: specsInput, ...restInput } = input;

      // Ship specs
      const specs = this.shipSpecsRepo.create(specsInput);
      await specs.save();

      // Ship model
      const model = this.shipModelRepo.create({
        ...restInput,
        specsId: specs.id,
      });

      model.save();
      return true;
    } catch (err) {
      // const message = `Failed to create ship model '${input.name}'`;
      throw Error('No idea');
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
      // const message = `Failed to create manufacturer '${input.name}'`;
      throw Error('No idea');
    }
  }
}

export default ShipModelProvider;
