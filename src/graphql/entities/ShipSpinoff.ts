import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './BaseEntity';
import ShipModel from './ShipModel';

@Entity()
@ObjectType()
export default class ShipSpinoff extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(() => ShipModel, (sm: ShipModel) => sm.spinoffs)
  model: Promise<ShipModel>;
}
