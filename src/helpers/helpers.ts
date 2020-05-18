import { InternalInputError, InternalDatabaseError } from '@common/errors';

/** Helper: catch input errors */
export async function inputTryCatch<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new InternalInputError(err);
  }
}

/** Helper: catch database operation errors */
export async function dbTryCatch<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new InternalDatabaseError(err);
  }
}

/** Keep only letters and numbers */
export const alphanumeric = (s: string): string => {
  const result = s.match(/[a-z0-9]/gi);
  return !result ? '' : result.join('');
};

export { getSemVer } from './get-sem-ver';
export { createToken } from './create-token';
