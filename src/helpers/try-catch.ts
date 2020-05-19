import get from 'lodash.get';

import {
  InternalInputError,
  InternalDatabaseError,
  AlreadyExistsError,
} from '@common/errors';

import { PG_UNIQUE_VIOLATION } from '@common/constants/error-codes-pg';

interface PgExtension {
  code: string;
  detail: string;
  table: string;
}

const catchPostgresError = (err: Error) => {
  const pgExt: PgExtension = get(err, 'extensions.postgres', null);
  const isPostgresErr = !!pgExt;

  if (isPostgresErr && pgExt.code === PG_UNIQUE_VIOLATION) {
    throw new AlreadyExistsError(err);
  }
};

/** Helper: catch input errors */
export async function inputTryCatch<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof Error) {
      catchPostgresError(err);
    }

    throw new InternalInputError(err);
  }
}

/** Helper: catch database operation errors */
export async function dbTryCatch<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof Error) {
      catchPostgresError(err);
    }

    throw new InternalDatabaseError(err);
  }
}
