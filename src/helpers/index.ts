/** Keep only letters and numbers */
export const alphanumeric = (s: string): string => {
  const result = s.match(/[a-z0-9]/gi);
  return !result ? '' : result.join('');
};

export { getSemVer } from './get-sem-ver';
export { createToken } from './create-token';
