import { InputType, Field } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { Manufacturer } from '@root/entities';

@InputType()
class CreateManufacturerInput implements Partial<Manufacturer> {
  @Field()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;
}

export default CreateManufacturerInput;
