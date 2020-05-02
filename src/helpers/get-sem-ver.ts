import fs from 'fs';
import path from 'path';

interface PJson {
  version?: string;
}

const getSemVer = () => {
  const root = path.resolve(__dirname, '..', '..');
  const contents = String(fs.readFileSync(`${root}/package.json`));
  const pjson: PJson = contents ? JSON.parse(contents) : {};

  return pjson.version || '0.0.0';
};

export default getSemVer;
