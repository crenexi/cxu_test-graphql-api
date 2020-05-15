// import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
// import get from 'lodash.get';
import logger from '@services/logger';

const formatError = (err: GraphQLError) => {
  if (err.originalError instanceof ApolloError) return err;

  // Log internally
  // const id = uuidv4();
  // logger.error(`Error ID: ${id}`);
  logger.error(err);
  // console.log(err);

  return err;
};

export default formatError;
