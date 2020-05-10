import { ObjectType, Field, createUnionType } from 'type-graphql';
import { ShipModel } from '../../../../entities';

@ObjectType()
class IsDeleted {
  @Field()
  message: string;
}

const ShipModelResult = createUnionType({
  name: 'ShipModelResult',
  types: () => [ShipModel, IsDeleted],
});

export default ShipModelResult;
