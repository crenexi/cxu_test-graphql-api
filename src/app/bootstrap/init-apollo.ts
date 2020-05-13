import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import logger from '@services/logger';
import { emitSchemaSnap } from '@services/graphql-utils';
import AppModule from '@graphql/AppModule';
import { InitApollo } from '@root/types';

/** Handle Apollo errors */
const formatError = (err: GraphQLError) => {
  if (err.originalError instanceof ApolloError) return err;
  const errId = uuidv4();

  // Log error and return internal error
  logger.error(`Error ID: ${errId}} | ${err}`);
  return new GraphQLError(`Internal Error: ${errId}`);
};

/** Setup the Apollo server */
const initApollo: InitApollo = async ({ conn, app }) => {
  const { schema, context } = AppModule.forRoot({ conn });

  emitSchemaSnap(schema);

  const apolloServer = new ApolloServer({
    schema,
    context,
    formatError,
  });

  // Apply app to apollo server
  // Note: app has cors, so we don't need it here
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  return Promise.resolve();
};

export default initApollo;
