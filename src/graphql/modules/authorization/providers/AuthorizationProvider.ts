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

type UserIdentifier = {
  idType: 'handle' | 'email';
  idValue: string;
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
    const password = await this.genHash(credentials.password);
    const { handle, email } = credentials;

    // Ensure handle or email is supplied
    if (!handle || !email) {
      throw new Error(messages.noIdentifier);
    }

    // Check handle availability
    if (handle) {
      const user = await this.getUserByHandle(handle);
      if (user) throw new AuthenticationError(messages.handleTaken);
    }

    // Check email availability
    if (email) {
      const user = await this.getUserByEmail(email);
      if (user) throw new AuthenticationError(messages.emailTaken);
    }

    // Create user and login
    await this.userRepo.insert({ handle, email, password });
    return this.login(credentials);
  }

  /** Login */
  async login(credentials: Credentials): Promise<User> {
    const { handle, email, password } = credentials;

    // Get user by supplied handle/email
    const user = await (() => {
      if (handle) return this.getUserByHandle(handle);
      if (email) return this.getUserByEmail(email);
      throw new AuthenticationError(messages.noIdentifier);
    })();

    // User exists
    if (!user) {
      throw new AuthenticationError(messages.wrongUser);
    }

    // User is deleted
    if (user.isArchived) {
      throw new AuthenticationError(messages.deletedUser);
    }

    // User is suspended
    if (user.isSuspended) {
      throw new AuthenticationError(messages.suspendedUser);
    }

    // Password checks out
    if (!this.isValidPassword(user, password)) {
      throw new AuthenticationError(messages.wrongPassword);
    }

    return user;
  }

  /** Get user by handle */
  async getUserByHandle(handle: string): Promise<User | false> {
    return await this.userRepo.findOne({ where: { handle } }) || false;
  }

  /** Get user by email */
  async getUserByEmail(email: string): Promise<User | false> {
    return await this.userRepo.findOne({ where: { email } }) || false;
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
        resolve(matches);
      });
    });
  }
}
