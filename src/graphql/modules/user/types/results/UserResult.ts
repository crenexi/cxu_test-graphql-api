import { ObjectType, Field, createUnionType } from 'type-graphql';
import { User } from '../../../../entities';

@ObjectType()
class IsSuspended {
  @Field()
  suspensionReason: string;
}

@ObjectType()
class IsArchived {
  @Field()
  archivalReason: string;
}

@ObjectType()
class NotFound {
  @Field()
  message: string;
}

const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, IsSuspended, IsArchived, NotFound],
  resolveType: (value) => {
    if ('suspensionReason' in value) return IsSuspended;
    if ('archivalReason' in value) return IsArchived;
    if ('message' in value) return NotFound;
    return User;
  },
});

export default UserResult;
