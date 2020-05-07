import fs from 'fs';
import path from 'path';

/** Gets the semantic version from package.json */
export const getSemVer = () => {
  const root = path.resolve(__dirname, '..', '..');
  const contents = String(fs.readFileSync(`${root}/package.json`));
  const pjson: { version?: string } = contents ? JSON.parse(contents) : {};

  return pjson.version || '0.0.0';
};

/** Keep only letters and numbers */
export const alphanumeric = (s: string): string => {
  const result = s.match(/[a-z0-9]/gi);
  return !result ? '' : result.join('');
};

export default {};
