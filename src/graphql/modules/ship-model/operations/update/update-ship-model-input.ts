import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { ShipModel } from '@root/entities';
import { UpdateShipSpecsInput } from './update-ship-specs-input';

@InputType()
export class UpdateShipModelInput implements Partial<ShipModel> {
  /** Is archived */
  @Field({ nullable: true })
  isArchived?: boolean;

  /** Name */
  @Field({ nullable: true })
  @MaxLength(50)
  name?: string;

  /** Description */
  @Field({ nullable: true })
  @MaxLength(1000)
  description?: string;

  /** Specs input */
  @Field(
    () => UpdateShipSpecsInput,
    { nullable: true },
  )
  specsInput?: UpdateShipSpecsInput;
}
