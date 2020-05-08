import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
// import resolvers from './graphql/resolvers';
import buildLoaders from './graphql/loaders';
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
const initApollo = async (app: express.Application): Promise<void> => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers }),
    context: ({ req }) => ({
      req,
      url: `${req.protocol}://${req.get('host')}`,
      ...buildLoaders(),
    }),
    // TODO: add redis and session: request.session to context
    formatError: handleFormatError,
  });

  // Apply app to apollog server
  // Note: app has cors, so we don't need it here
  apolloServer.applyMiddleware({ app, cors: false });
  return Promise.resolve();
};

export default initApollo;
