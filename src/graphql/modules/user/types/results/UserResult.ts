import { ObjectType, Field, createUnionType } from 'type-graphql';
import { User } from '../../../../entities';

@ObjectType()
class IsArchived {
  @Field()
  message: string;
}

@ObjectType()
class IsSuspended {
  @Field()
  reason: string;
}

const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, IsArchived, IsSuspended],
  resolveType: (value) => {
    if (value instanceof User) return User;
    if (value instanceof IsArchived) return IsArchived;
    if (value instanceof IsSuspended) return IsSuspended;
    return undefined;
  },
});

export default UserResult;
