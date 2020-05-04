import express, { Request, Response } from 'express';
import getSemVer from './helpers/get-sem-ver';

const apiRouter = (): express.Router => {
  const router = express.Router();
  const version = getSemVer();

  router.get('/', (_: Request, res: Response) => {
    res.json({ version });
  });

  return router;
};

export default apiRouter;
