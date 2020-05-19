import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { EmailAddress } from '@graphql/common/types';
import { BaseEntity } from './_base-entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  /** Password */
  @Column()
  password: string;

  /** Handle */
  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  handle?: string;

  /** Email */
  @Field(() => EmailAddress)
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  email?: string;

  /** Signature */
  @Field()
  @Column({ type: 'varchar', length: 75, nullable: true })
  signature?: string;

  /** Archival notice */
  @Field()
  @Column({ nullable: true })
  archivalNotice?: string;

  /** Is suspended */
  @Field()
  @Column({ default: false })
  isSuspended: boolean;

  /** Suspension Notice */
  @Field()
  @Column({ nullable: true })
  suspensionNotice?: string;
}
