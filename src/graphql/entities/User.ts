import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  handle: string

  @Column()
  password: string
}
