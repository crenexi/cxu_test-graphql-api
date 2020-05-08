import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import ShipIdentity from './ShipIdentity';

@Entity()
@ObjectType()
class Manufacturer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text', length: 50, unique: true })
  name: string;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToMany(
    () => ShipIdentity,
    (si: ShipIdentity) => si.manufacturer,
    { nullable: true },
  )
  shipIdentities: Promise<ShipIdentity[]>;
}

export default Manufacturer;
