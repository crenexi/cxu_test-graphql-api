import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { ShipModel } from '@root/entities';
import CreateShipSpecsInput from './CreateShipSpecsInput';

@InputType()
export class CreateShipModelInput implements Partial<ShipModel> {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @MaxLength(1000)
  description: string;

  @Field(() => CreateShipSpecsInput)
  specs: CreateShipSpecsInput;
}
