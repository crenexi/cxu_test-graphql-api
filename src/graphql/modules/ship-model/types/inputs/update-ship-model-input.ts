import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { ShipModel } from '@root/entities';
import { UpdateShipSpecsInput } from './update-ship-specs-input';

@InputType()
export class UpdateShipModelInput implements Partial<ShipModel> {
  @Field()
  isArchived?: boolean;

  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @MaxLength(1000)
  description: string;

  @Field(() => UpdateShipSpecsInput)
  specs: UpdateShipSpecsInput;
}
