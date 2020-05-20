import { InputType, Field, Int } from 'type-graphql';
import { IsPositive, IsEnum } from 'class-validator';
import { ShipSpecs } from '@root/entities';
import {
  ShipSizeClass,
  ShipCrewClass,
  ShipLengthClass,
} from '@root/entities/ship-specs';

@InputType()
export class UpdateShipSpecsInput implements Partial<ShipSpecs> {
  /** Size class */
  @Field(
    () => ShipSizeClass,
    { nullable: true },
  )
  @IsEnum(ShipSizeClass)
  sizeClass?: ShipSizeClass;

  /** Crew class */
  @Field(
    () => ShipCrewClass,
    { nullable: true },
  )
  @IsEnum(ShipCrewClass)
  crewClass?: ShipCrewClass;

  /** Length class */
  @Field(
    () => ShipLengthClass,
    { nullable: true },
  )
  @IsEnum(ShipLengthClass)
  lengthClass?: ShipLengthClass;

  /** Cargo capacity */
  @Field(() => Int)
  @IsPositive()
  cargoCapacity?: number;
}
