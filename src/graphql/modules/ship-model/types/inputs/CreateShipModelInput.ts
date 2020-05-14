import { InputType, Field } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { ShipModel } from '@root/entities';
import CreateShipSpecsInput from './CreateShipSpecsInput';

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

  @Field(() => CreateShipSpecsInput)
  specs: CreateShipSpecsInput;
}

export default CreateShipModelInput;
