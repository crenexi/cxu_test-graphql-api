import { Connection } from 'typeorm';
import express from 'express';
import IORedis from 'ioredis';
import connectRedis from 'connect-redis';

// ###########################
// ### Main ##################
// ###########################

export type Connect = () => Promise<Connection>;

export type Main = () => Promise<express.Application | null>;

export type Bootstrap = (conn: Connection) => Promise<express.Application>;

export type InitSession = (app: express.Application) => void;

export type InitMiddlewares = (app: express.Application) => void;

export type InitApollo = (options: {
  conn: Connection;
  app: express.Application;
}) => Promise<void>;

// ###########################
// ### Redis #################
// ###########################

export type RedisState = {
  store: connectRedis.RedisStore;
  client: IORedis.Redis;
};

export type InitRedis = () => RedisState;

// ###########################
// ### Apollo ################
// ###########################

export type Session = {
  req: express.Request;
  res: express.Response;
};

export type ConnectionParams = {
  authToken?: string;
};

// ###########################
// ### AppModule #############
// ###########################

export type AppModuleConfig = {
  conn: Connection;
};

export type AppModuleContext = {
  url: string;
};
