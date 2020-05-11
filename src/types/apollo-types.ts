import { Connection } from 'typeorm';
import express from 'express';

import User from '../graphql/entities/User';

export type InitApollo = (options: {
  conn: Connection;
  app: express.Application;
}) => Promise<void>;

export type Context = {
  conn: Connection;
  user: User;
}
