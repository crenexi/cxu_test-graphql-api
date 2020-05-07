import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { typeormLoaders } from './config/typeorm';
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
const initGraphQL = (app: express.Application): Promise<void> => {
  // Call all supplied loaders before passing to context
  const loaders = Object.entries(typeormLoaders)
    .reduce((loaders, [key, loaderFn]) => ({
      ...loaders,
      [key]: loaderFn(),
    }), {});

  const apolloServer = new ApolloServer({
    context: {
      ...loaders,
    },
    formatError: handleFormatError,
  });

  // Apply app to apollog server
  // Note: app has cors, so we don't need it here
  apolloServer.applyMiddleware({ app, cors: false });
  return Promise.resolve();
};

export default initGraphQL;

const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [__dirname + "/modules/**/resolver.*"],
    authChecker: ({ context }) => {
      return context.req.session && context.req.session.userId; // or false if access denied
    },
  }),
  context: ({ req }: any) => ({
    req,
    userLoader: userLoader(),
    questionReplyLoader: questionReplyLoader(),
  }),
});
