import { InputType, Field } from 'type-graphql';
import { ShipSpinoff } from '@root/entities';

@InputType()
export class CreateShipSpinoffInput implements Partial<ShipSpinoff> {
  /** Name */
  @Field()
  name: string;

  /** Description */
  @Field()
  description: string;
}
