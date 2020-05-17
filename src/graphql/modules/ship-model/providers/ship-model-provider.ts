import { Connection, Repository } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { InternalError, InternalDatabaseError } from '@common/errors';
import {
  ShipModel,
  ShipIdentity,
  ShipSpecs,
  Manufacturer,
} from '@root/entities';
import { messages } from '../constants';
import {
  CreateShipModelInput,
  UpdateShipModelInput,
  CreateManufacturerInput,
} from '../types/inputs';
import {
  ShipModelResult,
  ShipIdentityResult,
  ManufacturerResult,
} from '../types/results';

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

  /** Get ship models */
  async getModels(): Promise<ShipModel[]> {
    return this.shipModelRepo
      .createQueryBuilder('shipModel')
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getMany();
  }

  /** Get ship model */
  async getModel(id: string): Promise<typeof ShipModelResult> {
    // Get the model
    const model = await this.shipModelRepo.findOne(id);

    // Undefined model
    if (!model) {
      return ({ notFoundNotice: messages.undefinedModel });
    }

    // Get the specs
    const specs = await this.shipModelRepo
      .createQueryBuilder()
      .relation('specs')
      .of(ShipSpecs)
      .loadOne();

    // Undefined specs
    if (!specs) {
      throw new InternalError(messages.undefinedSpecs);
    }

    return { ...model, specs };
  }

  /** Create ship model */
  async createModel(
    input: CreateShipModelInput,
  ): Promise<ShipModel> {
    const { specs: shipSpecs, ...restInput } = input;

    try {

    } catch (err) {
      throw new InternalDatabaseError(err);
    }

    // try {
    //   await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //       { firstName: "Timber", lastName: "Saw" },
    //       { firstName: "Phantom", lastName: "Lancer" }
    //    ])
    //   .execute();

    //   const { specs: shipSpecs, ...restInput } = input;

    //   // Create ship specs
    //   const specs = this.shipSpecsRepo.create(shipSpecs);
    //   await specs.save();

    //   // Create ship model
    //   const shipModel = {
    //     ...restInput,
    //     specsId: specs.id,
    //   };
    //   const model = this.shipModelRepo.create(shipModel);
    //   const savedModel = await model.save();

    //   // Updated ship model
    //   return savedModel;
    // } catch (err) {
    //   throw Error(err);
    // }
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
