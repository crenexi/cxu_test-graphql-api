/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-server-express';
import { errorMeta, ErrorMeta } from '../constants';

type Details = (meta: ErrorMeta, m: any) => any;

const details: Details = (meta, m) => {
  const { defaultMessage, code, name } = meta;

  const message = (() => {
    if (!m) return defaultMessage;
    if (m instanceof Error || m.message) return m.message;
    return m;
  })();

  return { message, code, name };
};

/** Generic internal error */
export class InternalError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}

/** Internal database error */
export class InternalDatabaseError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalDatabaseError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}

/** Internal input error */
export class InternalInputError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalInputError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}

/** Authentication error */
export class AuthenticationError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.authenticationError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}

/** Already authenticated error */
export class AlreadyAuthenticatedError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.alreadyAuthenticatedError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}

/** Forbidden error */
export class ForbiddenError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.forbiddenError;
    const { message, code, name } = details(meta, m);
    super(message, code, { name, ...properties });
  }
}
