import { Resolver, Query, Arg } from 'type-graphql';
import { UserProvider } from '../providers';
import { User } from '../../../entities';
import { UserResult } from '../types/results';

@Resolver(() => User)
export default class UserResolver {
  constructor(private userProvider: UserProvider) {
    this.userProvider = userProvider;
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userProvider.getUsers();
  }

  @Query(() => UserResult)
  user(@Arg('id') id: string): Promise<typeof UserResult> {
    return this.userProvider.getUser(id);
  }
}
