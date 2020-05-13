import express, { Response } from 'express';
import { getSemVer } from '@root/helpers';
import { refreshTokenController } from './routes/refresh-token';

const router = express.Router();

// Index
router.get('/', (_, res: Response) => {
  const version = getSemVer();
  res.json({ version });
});

// Refresh token
router.get('/refresh-token', refreshTokenController);

export default router;
