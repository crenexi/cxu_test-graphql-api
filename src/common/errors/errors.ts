import { ApolloError } from 'apollo-server-express';
import { errorMeta } from '../constants';

/** Unknown error */
export class UnknownError extends ApolloError {
  constructor(m?: string) {
    const { name, code, message } = errorMeta.unknownError;
    const properties = { name };

    super(m || message, code, properties);
  }
}
