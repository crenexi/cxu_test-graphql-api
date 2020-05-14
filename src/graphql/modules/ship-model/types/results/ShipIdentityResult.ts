import { createUnionType } from 'type-graphql';
import { ShipIdentity } from '@root/entities';
import { WarnNotFound } from '@graphql/common/types';

const ShipIdentityResult = createUnionType({
  name: 'ShipIdentityResult',
  types: () => [ShipIdentity, WarnNotFound],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return 'WarnNotFound';
    return 'ShipIdentity';
  },
});

export default ShipIdentityResult;
