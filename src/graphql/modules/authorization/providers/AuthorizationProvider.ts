import { Connection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { OnRequest, OnConnect, ModuleSessionInfo } from '@graphql-modules/core';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import bcrypt from 'bcrypt-nodejs';
import { User } from '../../../entities';

type Credentials = {
  password: string;
  handle?: string;
  email?: string;
}

@Injectable({ scope: ProviderScope.Session })
export default class AuthProvider implements OnRequest, OnConnect {
  userRepo: Repository<User>;
  currentUser: User;

  constructor(private conn: Connection) {
    this.userRepo = conn.getRepository(User);
  }

  /** Login */
  async login(credentials: Credentials): Promise<User | false> {
    const { handle, email, password } = credentials;

    if (!handle && !email) {
      throw new AuthenticationError('Must supply handle or email');
    }

    const user = await (() => {
      if (handle) return this.getUserByHandle(handle);
      return this.getUserByEmail(email as string);
    })();

    if (user && this.isValidPassword(user, password)) return user;
    return false;
  }

  /** Get user by handle */
  async getUserByHandle(handle: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { handle } });
  }

  /** Get user by email */
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  /** Create hash */
  generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  /** Validate password */
  isValidPassword(user: User, suppliedPassword: string) {
    return bcrypt.compareSync(user.password, suppliedPassword);
  }
}
