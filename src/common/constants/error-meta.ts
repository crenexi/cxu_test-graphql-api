import { errorCodes as codes } from './error-codes';

interface ErrorMeta {
  name: string;
  code: string;
  defaultMessage: string;
}

interface Errors {
  unknownError: ErrorMeta;
  unknownDatabaseError: ErrorMeta;
  unknownInputError: ErrorMeta;
  authenticationError: ErrorMeta;
  alreadyAuthenticatedError: ErrorMeta;
  forbiddenError: ErrorMeta;
}

export const errorMeta: Errors = {
  unknownError: {
    name: 'InternalServerError',
    code: codes.internalServerError,
    defaultMessage: 'An unknown error has occured',
  },
  unknownDatabaseError: {
    name: 'InternalDatabaseError',
    code: codes.internalServerError,
    defaultMessage: 'An unknown error has occured',
  },
  unknownInputError: {
    name: 'InternalInputError',
    code: codes.internalServerError,
    defaultMessage: 'An unknown internal input error occured',
  },
  authenticationError: {
    name: 'AuthenticationError',
    code: codes.authenticationError,
    defaultMessage: 'You must be logged in to do that',
  },
  alreadyAuthenticatedError: {
    name: 'AlreadyAuthenticated',
    code: codes.authenticationError,
    defaultMessage: `You're already logged in`,
  },
  forbiddenError: {
    name: 'ForbiddenError',
    code: codes.internalServerError,
    defaultMessage: `You're are not authorized to do that`,
  },
};
