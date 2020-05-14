import { InputType, Field, Int } from 'type-graphql';
import { ShipSpecs } from '@root/entities';
import {
  ShipSizeClass,
  ShipCrewClass,
  ShipLengthClass,
} from '@root/entities/ShipSpecs';

@InputType()
class CreateShipSpecsInput implements Partial<ShipSpecs> {
  @Field(() => ShipSizeClass)
  sizeClass: ShipSizeClass;

  @Field(() => ShipCrewClass)
  crewClass: ShipCrewClass;

  @Field(() => ShipLengthClass)
  lengthClass: ShipLengthClass;

  @Field(() => Int)
  cargoCapacity: number;
}

export default CreateShipSpecsInput;
