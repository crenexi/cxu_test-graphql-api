import { Connection, Repository } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { AuthProvider } from '../../auth/providers';
import { User } from '../../../entities';

@Injectable({ scope: ProviderScope.Session })
export default class UserProvider {
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
  async getUser(id: string): Promise<User | false> {
    const user = await this.userRepo.findOne(id);

    // User not found
    if (!user) return false;


  }
}
