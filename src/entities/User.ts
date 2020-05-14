import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Column()
  password: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  handle?: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  email?: string;

  @Field()
  @Column({ type: 'varchar', length: 75, nullable: true })
  signature?: string;

  @Field()
  @Column({ default: false })
  isSuspended: boolean;

  @Field()
  @Column({ nullable: true })
  suspensionNotice?: string;

  @Field()
  @Column({ nullable: true })
  archivalNotice?: string;
}

export default User;
