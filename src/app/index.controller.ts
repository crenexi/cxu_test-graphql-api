import { Request, Response } from 'express';

const indexController = (_: Request, res: Response) => {
  res.render('./index.view.ejs');
};

export default indexController;
