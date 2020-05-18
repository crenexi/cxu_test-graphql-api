import { InputType, Field } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { Manufacturer } from '@root/entities';

@InputType()
export class CreateManufacturerInput implements Partial<Manufacturer> {
  /** Name */
  @Field()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;
}
