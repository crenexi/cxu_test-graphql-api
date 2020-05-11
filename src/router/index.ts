import express, { Request, Response } from 'express';
import { getSemVer } from '../helpers';
import { refreshTokenController } from './refresh-token';

const router = express.Router();

// Index
router.get('/', (_: Request, res: Response) => {
  const version = getSemVer();
  res.json({ version });
});

// Refresh token
router.get('/refresh_token', refreshTokenController);

export default router;
