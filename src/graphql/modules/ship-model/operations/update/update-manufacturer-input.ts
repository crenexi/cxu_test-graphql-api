import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Manufacturer } from '@root/entities';

@InputType()
export class UpdateManufacturerInput implements Partial<Manufacturer> {
  /** Name */
  @Field({ nullable: true })
  @MaxLength(50)
  name?: string;

  /** Moniker */
  @Field({ nullable: true })
  @MaxLength(25)
  moniker?: string;
}
