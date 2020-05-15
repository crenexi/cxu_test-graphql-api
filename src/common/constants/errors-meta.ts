import codes from './error-codes';

interface ErrorMeta {
  [key: string]: {
    name: string;
    code: string;
    message: string;
  };
}

const errorMeta: ErrorMeta = {
  unknownError: {
    name: 'InternalServerError',
    code: codes.internalServerError,
    message: 'An unknown error has occured',
  },
  unknownInputError: {
    name: 'InternalInputError',
    code: codes.internalServerError,
    message: 'An unknown internal input error occured',
  },
  authenticationError: {
    name: 'AuthenticationError',
    code: codes.authenticationError,
    message: 'You must be logged in to do that',
  },
  alreadyAuthenticatedError: {
    name: 'AlreadyAuthenticated',
    code: codes.authenticationError,
    message: `You're already logged in`,
  },
  forbiddenError: {
    name: 'ForbiddenError',
    code: codes.internalServerError,
    message: `You're are not authorized to do that`,
  },
};

export default errorMeta;
