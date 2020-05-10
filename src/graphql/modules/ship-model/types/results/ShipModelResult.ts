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
  resolveType: (value) => {
    if (value instanceof ShipModel) return ShipModel;
    if (value instanceof IsDeleted) return IsDeleted;
    return undefined;
  },
});

export default ShipModelResult;
