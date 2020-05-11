import { Connection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { OnRequest, OnConnect, ModuleSessionInfo } from '@graphql-modules/core';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { genSalt, hash, compare } from 'bcrypt-nodejs';
import { ConnectionParams } from '../../../../types';
import { User } from '../../../entities';
import { messages } from '../constants';

type Credentials = {
  password: string;
  handle?: string;
  email?: string;
}

@Injectable({ scope: ProviderScope.Session })
export default class AuthProvider implements OnRequest, OnConnect {
  userRepo: Repository<User>;
  currentUser: User | null;

  constructor(private conn: Connection) {
    this.userRepo = conn.getRepository(User);
  }

  /** On request */
  async onRequest({ session }: ModuleSessionInfo): Promise<void> {
    this.currentUser = !session.req ? null : session.req.user;
  }

  /** On connect */
  async onConnect(connParams: ConnectionParams): Promise<void> {
    const { authToken } = connParams;

    if (!authToken) {
      throw new AuthenticationError(messages.noToken);
    }

    // continue...
  }

  /** Join */
  async join(credentials: Credentials): Promise<User | false> {
    this.ensureIdentifier(credentials);

    const { handle, email, password } = credentials;

  }

  /** Login */
  async login(credentials: Credentials): Promise<User | false> {
    this.ensureIdentifier(credentials);

    const { handle, email, password } = credentials;

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

  /** Ensures handle or email is supplied */
  ensureIdentifier({ handle, email }: Credentials): void {
    if (!handle && !email) {
      throw new AuthenticationError(messages.noIdentifier);
    }
  }

  /** Create hash */
  async genHash(password: string): Promise<string> {
    return new Promise((resolve) => {
      genSalt(12, (err: Error, salt: string) => {
        if (err) throw err;

        hash(password, salt, (err: Error, hash: string) => {
          if (err) throw err;
          resolve(hash);
        });
      });
    });
  }

  /** Validate password */
  async isValidPassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      compare(password, user.password, (err: Error, matches: boolean) => {
        if (!matches) {
          throw new AuthenticationError(messages.wrongPassword);
        }

        resolve(true);
      });
    });
  }
}
