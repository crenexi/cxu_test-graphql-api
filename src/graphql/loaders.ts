import { manufacturerLoader } from './manufacturer';

type Loaders = { [key: string]: Function };

const loaders: Loaders = {
  manufacturerLoader,
};

export default loaders;
