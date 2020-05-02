import { Request, Response } from 'express';
import getSemVer from '@helpers/get-sem-ver';

const indexController = (_: Request, res: Response) => {
  const semVer = getSemVer();

  res.render('pages/index.ejs', { semVer });
};

export default indexController;
