import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { resolvers, loaders as loaderFns } from './config/orm';
import logger from './services/logger';

/** Handle Apollo errors */
const handleFormatError = (err: GraphQLError) => {
  if (err.originalError instanceof ApolloError) return err;
  const errId = uuidv4();

  // Log error and return internal error
  logger.error(`Error ID: ${errId}} | ${err}`);
  return new GraphQLError(`Internal Error: ${errId}`);
};

/** Setup the Apollo server */
const initGraphQL = async (app: express.Application): Promise<void> => {
  // Call all supplied loaders before passing to context
  const loaders = Object.entries(loaderFns)
    .reduce((loaders, [key, loaderFn]) => ({
      ...loaders,
      [key]: loaderFn(),
    }), {});

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers }),
    // context: ({ req }) => ({ req, ...loaders }),
    // TODO: add to context:  url: request.protocol + "://" + request.get("host"),
    // TODO: add redis and session: request.session to context
    // formatError: handleFormatError,
  });

  // Apply app to apollog server
  // Note: app has cors, so we don't need it here
  apolloServer.applyMiddleware({ app, cors: false });
  return Promise.resolve();
};

export default initGraphQL;
