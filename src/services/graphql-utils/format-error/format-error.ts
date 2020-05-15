/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
import get from 'lodash.get';
import config from '@config/app.config';
import { errorCodes } from '@common/constants';
import logger from '@services/logger';

const formatError = (err: GraphQLError) => {
  // GraphQL error codes
  const graphqlCodes = [
    errorCodes.graphqlParseError,
    errorCodes.graphqlValidationError,
  ];

  // Error code
  const code = get(err, 'extensions.code', errorCodes.internalServerError);
  const isGraphQLCode = graphqlCodes.includes(code);

  if (config.isDevelopment) {
    console.log(err);
    return err;
  }

  if (config.isProduction) {
    const id = uuidv4();

    if (isGraphQLCode) {
      logger.critical(`[GRAPHQL ERROR] ID: ${id}`);
    } else {
      logger.error(err);
    }

    const { message, locations, path } = err;
    return { id, message, locations, path, code };
  }

  return err;
};

export default formatError;
