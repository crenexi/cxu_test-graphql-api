import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Manufacturer from './Manufacturer';
import ShipModel from './ShipModel';

@Entity()
@ObjectType()
class ShipIdentity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;
}

export default ShipIdentity;
