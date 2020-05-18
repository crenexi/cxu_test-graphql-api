import { InputType, Field } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { ShipIdentity } from '@root/entities';

@InputType()
export class CreateShipIdentityInput implements Partial<ShipIdentity> {
  /** Name */
  @Field()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;

  /** Description */
  @Field()
  @IsAlphanumeric()
  @MaxLength(1000)
  description: string;
}
