import { OnRequest, OnConnect, ModuleSessionInfo } from '@graphql-modules/core';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { User } from '../../../entities';

export default class AuthProvider implements OnRequest, OnConnect {
  currentUser: User;

  constructor(private )

  getByHandle(handle: string) {
    return this.connection.getRepository(User).findOne({ where: { username } })
  }
}
