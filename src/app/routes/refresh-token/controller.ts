import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { createToken } from '../../../helpers';
import { User } from '../../../entities';
import config from '../../../config/server.config';
import logger from '../../../services/logger';

type AccessTokenPayload = {
  userId: string;
}

export default (async (req: Request, res: Response) => {
  const { cookieName, cookieOpts } = config.auth;
  const sendNoToken = () => res.send({ ok: false, accessToken: '' });

  const refresh = async ({ userId }: AccessTokenPayload) => {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ id: userId });

    if (!user) sendNoToken();

    // Setup refresh token
    const accessToken = createToken({ type: 'access', userId });
    const refreshToken = createToken({ type: 'refresh', userId });

    // Configure refresh token, and send access token
    res.cookie(cookieName, refreshToken, cookieOpts);
    res.send({ ok: true, accessToken });
  };

  // Get the token
  const token = req.cookies[cookieName];
  if (!token) sendNoToken();

  try {
    // Token verification; refresh if verified
    const payload = verify(token, config.auth.refreshSecret);
    refresh(payload as AccessTokenPayload);
  } catch (err) {
    logger.error(err);
    sendNoToken();
  }
});
