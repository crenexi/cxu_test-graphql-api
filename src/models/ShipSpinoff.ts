import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import ShipModel from '../ShipModel';

@Entity()
@ObjectType()
class ShipSpinoff extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text', unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @ManyToOne(() => ShipModel, (sm: ShipModel) => sm.spinoffs)
  model: Promise<ShipModel>;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;
}

export default ShipSpinoff;
