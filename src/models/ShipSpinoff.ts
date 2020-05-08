import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import ShipModel from './ShipModel';

@Entity()
@ObjectType()
class ShipSpinoff extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(() => ShipModel, (sm: ShipModel) => sm.spinoffs)
  model: Promise<ShipModel>;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;
}

export default ShipSpinoff;
