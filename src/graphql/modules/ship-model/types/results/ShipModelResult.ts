import { createUnionType } from 'type-graphql';
import { ShipModel } from '@root/entities';
import { WarnNotFound } from '@graphql/common/types';

const ShipModelResult = createUnionType({
  name: 'ShipModelResult',
  types: () => [ShipModel, WarnNotFound],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return 'WarnNotFound';
    return 'ShipModel';
  },
});

export default ShipModelResult;
