import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import ShipIdentity from '../ShipIdentity';

@Entity()
@ObjectType()
class Manufacturer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text', unique: true })
  name: string;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToMany(() => ShipIdentity, (s: ShipIdentity) => s.manufacturer)
  shipIdentities: Promise<ShipIdentity[]>;
}

export default Manufacturer;
