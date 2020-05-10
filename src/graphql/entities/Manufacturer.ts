import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';
import ShipIdentity from './ShipIdentity';

@Entity()
@ObjectType()
export default class Manufacturer extends BaseEntity {
  @Field()
  @Column({ type: 'text', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => ShipIdentity,
    (si: ShipIdentity) => si.manufacturer,
    { nullable: true },
  )
  shipIdentities: Promise<ShipIdentity[]>;
}
