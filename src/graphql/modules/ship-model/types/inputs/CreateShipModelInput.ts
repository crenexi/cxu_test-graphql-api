import { InputType, Field, Int } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { ShipModel } from '@root/entities';
import {
  ShipSizeClass,
  ShipCrewClass,
  ShipLengthClass,
} from '@root/entities/ShipModel';

@InputType()
class CreateShipModelInput implements Partial<ShipModel> {
  @Field()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;

  @Field()
  @IsAlphanumeric()
  @MaxLength(1000)
  description: string;

  @Field(() => ShipSizeClass)
  sizeClass: ShipSizeClass;

  @Field(() => ShipCrewClass)
  crewClass: ShipCrewClass;

  @Field(() => ShipLengthClass)
  lengthClass: ShipLengthClass;

  @Field(() => Int)
  cargoCapacity: number;
}

export default CreateShipModelInput;
