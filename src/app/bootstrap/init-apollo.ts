import { ApolloServer } from 'apollo-server-express';
import { emitSchemaSnap } from '@services/graphql-utils';
import { AppModule } from '@graphql/app-module';
import { InitApollo } from '@common/types';
import { formatError } from './format-error';

/** Setup the Apollo server */
const initApollo: InitApollo = async ({ conn, app }) => {
  const { schema, context } = AppModule.forRoot({ conn });

  // Emit schema snapshot
  emitSchemaSnap(schema);

  const apolloServer = new ApolloServer({
    schema, // schema from AppModule
    context, // context from AppModule
    formatError, // custom error format
    introspection: true,
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
