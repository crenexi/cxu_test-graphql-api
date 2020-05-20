import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Manufacturer } from '@root/entities';

@InputType()
export class CreateManufacturerInput implements Partial<Manufacturer> {
  /** Name */
  @Field()
  @MaxLength(50)
  name: string;

  /** Moniker */
  @Field()
  @MaxLength(25)
  moniker: string;
}
