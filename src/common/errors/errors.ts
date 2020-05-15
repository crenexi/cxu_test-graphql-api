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

/** Unknown input error */
export class UnknownInputError extends ApolloError {
  constructor(m?: string) {
    const { name, code, message } = errorMeta.unknownInputError;
    const properties = { name };

    super(m || message, code, properties);
  }
}

/** Authentication error */
export class AuthenticationError extends ApolloError {
  constructor(m?: string) {
    const { name, code, message } = errorMeta.authenticationError;
    const properties = { name };

    super(m || message, code, properties);
  }
}

/** Already authenticated error */
export class AlreadyAuthenticatedError extends ApolloError {
  constructor(m?: string) {
    const { name, code, message } = errorMeta.alreadyAuthenticatedError;
    const properties = { name };

    super(m || message, code, properties);
  }
}

/** Forbidden error */
export class ForbiddenError extends ApolloError {
  constructor(m?: string) {
    const { name, code, message } = errorMeta.forbiddenError;
    const properties = { name };

    super(m || message, code, properties);
  }
}
