import { InputType, Field, Int } from 'type-graphql';
import { IsPositive } from 'class-validator';
import { ShipSpecs } from '@root/entities';
import {
  ShipSizeClass,
  ShipCrewClass,
  ShipLengthClass,
} from '@root/entities/ship-specs';

@InputType()
export class CreateShipSpecsInput implements Partial<ShipSpecs> {
  /** Size class */
  @Field(() => ShipSizeClass)
  sizeClass: ShipSizeClass;

  /** Crew class */
  @Field(() => ShipCrewClass)
  crewClass: ShipCrewClass;

  /** Length class */
  @Field(() => ShipLengthClass)
  lengthClass: ShipLengthClass;

  /** Cargo capacity */
  @Field(() => Int)
  @IsPositive()
  cargoCapacity: number;
}
