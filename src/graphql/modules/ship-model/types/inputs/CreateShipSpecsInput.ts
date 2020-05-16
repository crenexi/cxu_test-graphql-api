import { InputType, Field, Int } from 'type-graphql';
import { IsPositive } from 'class-validator';
import { ShipSpecs } from '@root/entities';
import {
  ShipSizeClass,
  ShipCrewClass,
  ShipLengthClass,
} from '@root/entities/ShipSpecs';

@InputType()
export class CreateShipSpecsInput implements Partial<ShipSpecs> {
  @Field(() => ShipSizeClass)
  sizeClass: ShipSizeClass;

  @Field(() => ShipCrewClass)
  crewClass: ShipCrewClass;

  @Field(() => ShipLengthClass)
  lengthClass: ShipLengthClass;

  @Field(() => Int)
  @IsPositive()
  cargoCapacity: number;
}
