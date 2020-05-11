import { Connection } from 'typeorm';
import express from 'express';
import IORedis from 'ioredis';
import connectRedis from 'connect-redis';
import User from '../graphql/entities/User';

export type InitConnection = () => Promise<Connection>;

export type Main = () => Promise<express.Application | null>;

export type Bootstrap = (conn: Connection) => Promise<express.Application>;

export type RedisState = {
  store: connectRedis.RedisStore;
  client: IORedis.Redis;
};

export type InitRedis = () => RedisState;

export type InitSession = (app: express.Application) => void;

export type InitMiddlewares = (app: express.Application) => void;

export type InitApollo = (options: {
  conn: Connection;
  app: express.Application;
}) => Promise<void>;

export type Context = {
  conn: Connection;
  user: User;
}
