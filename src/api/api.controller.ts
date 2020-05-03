import { Request, Response } from 'express';
import getSemVer from '@helpers/get-sem-ver';

const indexController = (_: Request, res: Response) => {
  const version = getSemVer();

  res.json({
    version,
  });
};

export default indexController;
