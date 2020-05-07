import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
class Manufacturer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;

  @Field()
  @Column({ unique: true })
  name: string;
}

export default Manufacturer;
