/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
// import { ApolloError } from 'apollo-server-express';
import get from 'lodash.get';
import config from '@config/app.config';
import { errorCodes } from '@common/constants';
import logger from '@services/logger';

export const formatError = (err: GraphQLError) => {
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
    const { message, locations, path } = err;

    if (isGraphQLCode) {
      const logRows = [
        `[${code}]`,
        `ID: ${id}`,
        `Message: ${message}`,
        `Locations: ${JSON.stringify(locations)}`,
        `Path: ${JSON.stringify(path)}`,
      ];

      logger.critical(logRows.join('\n#| '));
    } else {
      logger.error(err);
    }

    return { id, message, locations, path, code };
  }

  return err;
};
