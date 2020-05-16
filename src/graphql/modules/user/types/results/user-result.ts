import { createUnionType } from 'type-graphql';
import { User } from '@root/entities';
import {
  WarnNotFound,
  WarnIsSuspended,
  WarnIsArchived,
} from '@graphql/common/types';

export const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, WarnNotFound, WarnIsSuspended, WarnIsArchived],
  resolveType: (value) => {
    if ('notFoundNotice' in value) return WarnNotFound;
    if ('archivalNotice' in value) return WarnIsArchived;
    if ('suspensionNotice' in value) return WarnIsSuspended;
    return User;
  },
});
