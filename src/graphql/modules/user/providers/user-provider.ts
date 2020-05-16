import { Connection, Repository } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { User } from '@root/entities';
import { AuthProvider } from '@modules/auth/providers';
import { messages } from '../constants';
import { UserResult } from '../types/results';

@Injectable({ scope: ProviderScope.Session })
export class UserProvider {
  private userRepo: Repository<User>;
  private currentUser: User | null;

  constructor(
    private conn: Connection,
    private authProvider: AuthProvider,
  ) {
    this.authProvider = authProvider;

    this.userRepo = conn.getRepository(User);
    this.currentUser = authProvider.currentUser;
  }

  /** Get the current user */
  getMe(): User | null {
    return this.currentUser;
  }

  /** Get users */
  async getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  /** Get user */
  async getUser(id: string): Promise<typeof UserResult> {
    const user = await this.userRepo.findOne(id);

    // User not found
    if (!user) {
      return { notFoundNotice: messages.undefinedUser };
    }

    // User is archived
    if (user.isArchived) {
      const notice = user.archivalNotice;
      return { archivalNotice: notice || messages.archivedUser };
    }

    // User is suspended
    if (user.isSuspended) {
      const notice = user.suspensionNotice;
      return { suspensionNotice: notice || messages.suspendedUser };
    }

    return user;
  }
}
