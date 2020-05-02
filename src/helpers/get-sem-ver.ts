import fs from 'fs';
import path from 'path';

const getSemVer = () => {
  const root = path.resolve(__dirname, '..', '..');
  const contents = String(fs.readFileSync(`${root}/package.json`));

  return contents ? JSON.parse(contents) : {};
};

export default getSemVer;
