import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { createToken } from '../../helpers';
import { User } from '../../graphql/entities';
import config from '../../config/server.config';
import logger from '../../services/logger';

type AccessTokenPayload = {
  userId: string;
}

const refreshTokenController = async (req: Request, res: Response) => {
  const sendNoToken = () => res.send({ ok: false, accessToken: '' });

  const refresh = async ({ userId }: AccessTokenPayload) => {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ id: userId });

    if (!user) sendNoToken();

    // Send new token
    const accessToken = createToken({ type: 'access', userId });
    res.send({ ok: true, accessToken });
  };

  // Get the token
  const token = req.cookies.avengersAssemble;
  if (!token) sendNoToken();

  try {
    // Token verification; refresh if verified
    const payload = verify(token, config.refreshTokenSecret);
    refresh(payload as AccessTokenPayload);
  } catch (err) {
    logger.error(err);
    sendNoToken();
  }
};

export default refreshTokenController;
