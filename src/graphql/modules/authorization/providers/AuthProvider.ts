import { Connection } from 'typeorm';
import { OnRequest, OnConnect, ModuleSessionInfo } from '@graphql-modules/core';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { User } from '../../../entities';

@Injectable({ scope: ProviderScope.Session })
export default class AuthProvider implements OnRequest, OnConnect {
  currentUser: User;

  constructor(private conn: Connection) {
    this.conn = conn;
  }

  getByHandle(handle: string) {
    return this.connection.getRepository(User).findOne({ where: { username } })
  }
}
