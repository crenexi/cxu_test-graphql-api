import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export abstract class BaseEntity {
  /** ID */
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Is archived */
  @Field()
  @Column({
    name: 'is_archived',
    type: 'boolean',
    default: false,
  })
  isArchived: boolean;

  /** Created at */
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  /** Updated at */
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
