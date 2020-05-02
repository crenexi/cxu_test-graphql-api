import { Request, Response } from 'express';
import getSemVer from '@helpers/get-sem-ver';

const indexController = (_: Request, res: Response) => {
  console.log(getSemVer());
  res.render('pages/index.ejs');
};

export default indexController;
