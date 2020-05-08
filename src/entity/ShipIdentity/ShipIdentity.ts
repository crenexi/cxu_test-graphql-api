import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Manufacturer from '../Manufacturer';
import ShipEntity from '../ShipEntity';

@Entity()
@ObjectType()
class ShipIdentity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Manufacturer)
  @ManyToOne(() => Manufacturer, (m: Manufacturer) => m.shipIdentities)
  manufacturer: Promise<Manufacturer>;

  @Field(() => [ShipEntity])
  @OneToMany(() => ShipEntity, (s: ShipEntity) => s.identity)
  variants: Promise<ShipEntity[]>;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;
}

export default ShipIdentity;
