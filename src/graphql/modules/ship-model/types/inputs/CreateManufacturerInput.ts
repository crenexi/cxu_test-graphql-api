import { InputType, Field } from 'type-graphql';
import { Manufacturer } from '@root/entities';

@InputType()
class AddManufacturerInput implements Partial<Manufacturer> {
  @Field()
  name: string;
}

export default AddManufacturerInput;
