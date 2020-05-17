import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from './_base-entity';
// import { ShipModel } from './ship-model';
import { Manufacturer } from './manufacturer';

@Entity()
@ObjectType()
export class ShipIdentity extends BaseEntity {
  /** Name */
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  /** Description */
  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  /** Manufacturer */
  @Field(() => Manufacturer)
  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.identities,
  )
  manufacturer: Manufacturer;

  // @Field(() => [ShipModel])
  // @OneToMany(
  //   () => ShipModel,
  //   (model: ShipModel) => model.identity)
  // models: Promise<ShipModel[]>;
}
