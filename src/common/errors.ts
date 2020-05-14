import { ApolloError } from 'apollo-server-express';
import { errorCodes, errorNames } from './constants';

export class DBError extends ApolloError {
  constructor(message: string, name: string = 'DBError') {
    super(message, errorCodes.dbError, { name });
  }
}

export class DBGetError extends DBError {
  constructor(message: string) {
    super(message, errorNames.dbGetError);
  }
}

export class DBCreateError extends DBError {
  constructor(message: string) {
    super(message, errorNames.dbCreateError);
  }
}

export class DBUpdateError extends DBError {
  constructor(message: string) {
    super(message, errorNames.dbUpdateError);
  }
}

export class DBDeleteError extends DBError {
  constructor(message: string) {
    super(message, errorNames.dbDeleteError);
  }
}
