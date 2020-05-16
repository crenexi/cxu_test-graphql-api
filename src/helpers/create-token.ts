import { sign } from 'jsonwebtoken';
import config from '@config/app.config';

type CreateTokenOpts = {
  type: 'access' | 'refresh';
  userId: string;
}

export const createToken = ({ type, userId }: CreateTokenOpts) => {
  const isRefresh = type === 'refresh';
  const expiresIn = isRefresh ? '7d' : '10m';

  const secret = isRefresh
    ? config.auth.refreshSecret
    : config.auth.accessSecret;

  return sign({ userId }, secret, { expiresIn });
};
