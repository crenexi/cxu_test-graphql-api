import { ApolloError } from 'apollo-server-express';
import { errorMeta } from '../constants';

type ErrorArgs = [string | Error, object];

/** Unknown error */
export class UnknownError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.unknownError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}

/** Unknown database error */
export class UnknownDatabaseError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.unknownDatabaseError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}

/** Unknown input error */
export class UnknownInputError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.unknownInputError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}

/** Authentication error */
export class AuthenticationError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.authenticationError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}

/** Already authenticated error */
export class AlreadyAuthenticatedError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.alreadyAuthenticatedError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}

/** Forbidden error */
export class ForbiddenError extends ApolloError {
  constructor(message?: string, properties?: object) {
    const { name, code, defaultMessage } = errorMeta.forbiddenError;
    super(message || defaultMessage, code, { name, ...properties });
  }
}
