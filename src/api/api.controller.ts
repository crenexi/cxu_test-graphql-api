import { Request, Response } from 'express';
import path from 'path';

const indexController = (_: Request, res: Response) => {
  res.render(path.join(__dirname, 'api.view.ejs'));
  // res.json({ message: 'Hello World' });
};

export default indexController;
