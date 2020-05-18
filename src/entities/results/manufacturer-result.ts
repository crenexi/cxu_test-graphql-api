import { createUnionType } from 'type-graphql';
import { Manufacturer } from '@root/entities';
import { WarnNotFound } from '@graphql/common/types';

export const ManufacturerResult = createUnionType({
  name: 'ManufacturerResult',
  types: () => [Manufacturer, WarnNotFound],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return 'WarnNotFound';
    return 'Manufacturer';
  },
});
