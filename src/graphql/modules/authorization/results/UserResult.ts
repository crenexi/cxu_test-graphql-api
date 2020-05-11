import { ObjectType, Field, createUnionType } from 'type-graphql';
import { User } from '../../../entities';

@ObjectType()
class IsDeleted {
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
  types: () => [User, IsDeleted, IsSuspended],
  resolveType: (value) => {
    if (value instanceof User) return User;
    if (value instanceof IsDeleted) return IsDeleted;
    if (value instanceof IsSuspended) return IsSuspended;
    return undefined;
  },
});

export default UserResult;
