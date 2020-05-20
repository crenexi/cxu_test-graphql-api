import { InputType, Field, Int } from 'type-graphql';
import { IsPositive, IsEnum } from 'class-validator';
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
  @IsEnum(ShipSizeClass)
  sizeClass: ShipSizeClass;

  /** Crew class */
  @Field(() => ShipCrewClass)
  @IsEnum(ShipCrewClass)
  crewClass: ShipCrewClass;

  /** Length class */
  @Field(() => ShipLengthClass)
  @IsEnum(ShipLengthClass)
  lengthClass: ShipLengthClass;

  /** Cargo capacity */
  @Field(() => Int)
  @IsPositive()
  cargoCapacity: number;
}
