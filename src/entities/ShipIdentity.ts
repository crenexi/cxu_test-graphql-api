import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';
import ShipModel from './ShipModel';
import Manufacturer from './Manufacturer';

@Entity()
@ObjectType()
export default class ShipIdentity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Field(() => Manufacturer)
  @ManyToOne(
    () => Manufacturer,
    (m: Manufacturer) => m.shipIdentities,
    { eager: true },
  )
  manufacturer: Manufacturer;

  @Field(() => [ShipModel])
  @OneToMany(() => ShipModel, (sm: ShipModel) => sm.identity)
  models: Promise<ShipModel[]>;
}
