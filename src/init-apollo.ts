import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { InitApollo } from './types';
import AppModule from './graphql/AppModule';
// import buildLoaders from './graphql/build-loaders';
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
const initApollo: InitApollo = async ({ conn, app }) => {
  const { schema, context } = AppModule.forRoot({ conn });

  const apolloServer = new ApolloServer({
    schema: AppModule.schema,
    context: ({ req, res }) => ({
      req,
      res,
      url: `${req.protocol}://${req.get('host')}`,
      // ...buildLoaders(),
    }),
    formatError: handleFormatError,
  });

  // Apply app to apollog server
  // Note: app has cors, so we don't need it here
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  return Promise.resolve();
};

export default initApollo;

// TODO: add redis to context
