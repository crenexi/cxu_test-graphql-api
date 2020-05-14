import { createUnionType } from 'type-graphql';
import { ShipSpecs } from '@root/entities';
import { WarnNotFound } from '@graphql/common/types';

const ShipSpecsResult = createUnionType({
  name: 'ShipSpecsResult',
  types: () => [ShipSpecs, WarnNotFound],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return 'WarnNotFound';
    return 'ShipSpecs';
  },
});

export default ShipSpecsResult;
