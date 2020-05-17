import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { BaseEntity } from './_base-entity';

/** The size class of the ship */
export enum ShipSizeClass {
  VEHICLE = 'vehicle',
  SNUB = 'snub',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  CAPITAL = 'capital',
}
registerEnumType(ShipSizeClass, {
  name: 'ShipSizeClass',
});

/** The crew capacity of the ship */
export enum ShipCrewClass {
  SINGLE = 'single',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
registerEnumType(ShipCrewClass, {
  name: 'ShipCrewClass',
  description: [
    'Single: 1 person',
    'Small: 2-3 crew',
    'Medium: 4-8 crew',
    'Large: 9+ crew',
  ].join(', '),
});

/** The length class of the ship */
export enum ShipLengthClass {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
}
registerEnumType(ShipLengthClass, {
  name: 'ShipLengthClass',
  description: [
    'Small: under 20m',
    'Medium: 20m-30m',
    'Large: 30m-90m',
    'XLarge: over 90m',
  ].join(', '),
});

@Entity()
@ObjectType()
export class ShipSpecs extends BaseEntity {
  /** Size class */
  @Field(() => ShipSizeClass)
  @Column({
    name: 'size_class',
    type: 'enum',
    enum: ShipSizeClass,
  })
  sizeClass: ShipSizeClass;

  /** Crew class */
  @Field(() => ShipCrewClass)
  @Column({
    name: 'crew_class',
    type: 'enum',
    enum: ShipCrewClass,
  })
  crewClass: ShipCrewClass;

  /** Length class */
  @Field(() => ShipLengthClass)
  @Column({
    name: 'length_class',
    type: 'enum',
    enum: ShipLengthClass,
  })
  lengthClass: ShipLengthClass;

  /** Cargo capacity */
  @Field(() => Int)
  @Column({ name: 'cargo_capacity', type: 'integer' })
  cargoCapacity: number;
}
