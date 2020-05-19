/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-server-express';
import { errorMeta, ErrorMeta } from '../constants';

type Details = (meta: ErrorMeta, m: any) => any;

const details: Details = (meta, value) => {
  const { defaultMessage, code, name } = meta;
  const isError = value instanceof Error;

  const message = (() => {
    if (!value) return defaultMessage;
    if (isError || value.message) return value.message;
    return value;
  })();

  const details: any = { message, code, name };

  // Postgres errors
  if (isError && value.detail && value.table) {
    details.postgres = {
      code: value.code,
      detail: value.detail,
      table: value.table,
    };
  }

  return details;
};

/** Generic internal error */
export class InternalError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Internal database error */
export class InternalDatabaseError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalDatabaseError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Internal input error */
export class InternalInputError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.internalInputError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Forbidden error */
export class ForbiddenError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.forbiddenError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Authentication error */
export class AuthenticationError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.authenticationError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Already authenticated error */
export class AlreadyAuthenticatedError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.alreadyAuthenticatedError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}

/** Already exists error */
export class AlreadyExistsError extends ApolloError {
  constructor(m?: any, properties?: object) {
    const meta = errorMeta.alreadyExistsError;
    const { message, code, ...restDetails } = details(meta, m);
    super(message, code, { ...restDetails, ...properties });
  }
}
