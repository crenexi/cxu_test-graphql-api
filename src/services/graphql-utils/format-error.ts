import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
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

  // Default extensions
  const defaultExtensions = { id, code, name };

  // Database errors
  const dbErrorNames = [
    'QueryFailedError', // database query error
  ];

  if (dbErrorNames.includes(name)) {
    return {
      message: `${name} - ${message}`,
      location: JSON.stringify(locations),
      parameters: get(err, 'extensions.exception.parameters', null),
      ...defaultExtensions,
    };
  }

  // Default response
  return { message, locations, path, extensions: defaultExtensions };
};

export default formatError;
