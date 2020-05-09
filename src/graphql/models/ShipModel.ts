import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Int, registerEnumType } from 'type-graphql';
import { ShipIdentity } from '../ship-identity';
import { ShipSpinoff } from '../ship-spinoff';

// Quick note about ship entities:
// ShipIdentity: a ship's central name (ex. Avenger)
// ShipModel: an elemental ship design (ex. Avenger Titan)
// ShipSpinoff: a style-related variant (ex. Avenger Titan Renegade)
// Ship: an actual ship entry (owned by a society member)

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
  name: 'Direction',
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
  name: 'ShipSizeClass',
});

@Entity()
@ObjectType()
export default class ShipModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

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

  @Field()
  @Column({ default: false })
  isFlightReady: boolean;

  @Field(() => ShipIdentity)
  @ManyToOne(() => ShipIdentity, (si: ShipIdentity) => si.models)
  identity: Promise<ShipIdentity>;

  @Field(() => [ShipSpinoff])
  @OneToMany(
    () => ShipSpinoff,
    (ss: ShipSpinoff) => ss.model,
    { eager: true, nullable: true },
  )
  spinoffs: Promise<ShipSpinoff[]>;

  @Field()
  @UpdateDateColumn()
  dateUpdated: Date;
}
