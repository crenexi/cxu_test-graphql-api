import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from './_base-entity';
// import { ShipIdentity } from './ship-identity';

@Entity()
@ObjectType()
export class Manufacturer extends BaseEntity {
  /** Name */
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  /** Moniker */
  @Field()
  @Column({ type: 'varchar', length: 25, unique: true })
  moniker: string;

  /** Identities */
  // @OneToMany(
  //   () => ShipIdentity,
  //   (identity: ShipIdentity) => identity.manufacturer,
  // )
  // identities: Promise<ShipIdentity[]>;
}
