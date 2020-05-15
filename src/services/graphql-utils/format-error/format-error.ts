/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
// import get from 'lodash.get';
import config from '@config/app.config';
import logger from '@services/logger';

const formatError = (err: GraphQLError) => {
  const { originalError } = err;

  if (config.isDevelopment) {
    console.log(originalError || err);
    return err;
  }

  if (config.isProduction) {
    if (err.originalError instanceof ApolloError) return err;

    // Log internally
    const id = uuidv4();
    logger.error(`Error ID: ${id}`);
    logger.error(err);

    const { message } = err;

    return { id, message };
  }

  return err;
};

export default formatError;
