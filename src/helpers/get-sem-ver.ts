import fs from 'fs';
import path from 'path';

/** Gets the semantic version from package.json */
export const getSemVer = () => {
  const root = path.resolve(__dirname, '..', '..');
  const contents = String(fs.readFileSync(`${root}/package.json`));
  const pjson: { version?: string } = contents ? JSON.parse(contents) : {};

  return pjson.version || '0.0.0';
};

export default getSemVer;
