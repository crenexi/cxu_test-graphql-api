import { Request, Response } from 'express';

const indexController = (_: Request, res: Response) => {
  // res.render('./index.view.ejs');
  res.json({ message: 'Hello World' });
};

export default indexController;
