import { InputType, Field } from 'type-graphql';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { ShipIdentity } from '@root/entities';

@InputType()
class CreateShipIdentityInput implements Partial<ShipIdentity> {
  @Field()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;

  @Field()
  @IsAlphanumeric()
  @MaxLength(1000)
  description: string;
}

export default CreateShipIdentityInput;
