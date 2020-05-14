import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloError, UserInputError } from 'apollo-server-express';
import get from 'lodash.get';
import logger from '@services/logger';

const formatError = (err: GraphQLError) => {
  if (err.originalError instanceof ApolloError) return err;

  // Log internally
  const id = uuidv4();
  logger.error(`Error ID: ${id}`);
  logger.error(err);

  // Error properties
  const { message, locations, path } = err;
  const code = get(err, 'extension.code', 'Internal Error');
  const name = get(err, 'extensions.exception.name', '');
  const parameters = get(err, 'extensions.exception.parameters', null);

  // Default properties
  const defaults = { id, message, locations, path, code, name };

  // Input errors
  const inputErrorNames = [
    'QueryFailedError', // database query error
  ];

  if (inputErrorNames.includes(name)) {
    return new UserInputError(name, { ...defaults, parameters });
  }

  // Default response
  return defaults;
};

export default formatError;
