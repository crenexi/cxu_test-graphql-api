import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import BaseEntity from './_BaseEntity';

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
  C1_SINGLE = 'single', // 1 person
  C2_SMALL_CREW = 'smallCrew', // 2-3 crew
  C3_MEDIUM_CREW = 'mediumCrew', // 4-8 crew
  C4_LARGE_CREW = 'largeCrew', // 9+ crew
}
registerEnumType(ShipCrewClass, {
  name: 'ShipCrewClass',
});

/** The length class of the ship */
export enum ShipLengthClass {
  C1_SMALL = 'small', // under 20m
  C2_MEDIUM = 'medium', // 20m-30m
  C3_LARGE = 'large', // 30m-90m
  C4_XLARGE = 'xlarge', // over 90m
}
registerEnumType(ShipLengthClass, {
  name: 'ShipLengthClass',
});

@Entity()
@ObjectType()
class ShipSpecs extends BaseEntity {
  @Field(() => ShipSizeClass)
  @Column({ type: 'enum', enum: ShipSizeClass })
  sizeClass: ShipSizeClass;

  @Field(() => ShipCrewClass)
  @Column({ type: 'enum', enum: ShipCrewClass })
  crewClass: ShipCrewClass;

  @Field(() => ShipLengthClass)
  @Column({ type: 'enum', enum: ShipLengthClass })
  lengthClass: ShipLengthClass;

  @Field(() => Int)
  @Column('integer')
  cargoCapacity: number;
}

export default ShipSpecs;
