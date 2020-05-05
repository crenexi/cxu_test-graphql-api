import express, { Request, Response } from 'express';
import getSemVer from './helpers/get-sem-ver';

const apiRouter = (): express.Router => {
  const router = express.Router();

  // Index
  router.get('/', (_: Request, res: Response) => {
    const version = getSemVer();
    res.json({ version });
  });

  return router;
};

export default apiRouter;
