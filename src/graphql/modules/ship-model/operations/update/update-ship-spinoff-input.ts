import { InputType, Field } from 'type-graphql';
import { ShipSpinoff } from '@root/entities';

@InputType()
export class UpdateShipSpinoffInput implements Partial<ShipSpinoff> {
  /** Name */
  @Field({ nullable: true })
  name?: string;

  /** Description */
  @Field({ nullable: true })
  description?: string;
}
