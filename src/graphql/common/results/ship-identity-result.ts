import { createUnionType } from 'type-graphql';
import { ShipIdentity } from '@root/entities';
import { WarnNotFound } from '@graphql/common/types';

export const ShipIdentityResult = createUnionType({
  name: 'ShipIdentityResult',
  types: () => [ShipIdentity, WarnNotFound],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return 'WarnNotFound';
    return 'ShipIdentity';
  },
});
