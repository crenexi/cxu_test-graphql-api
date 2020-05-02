import express from 'express';
import apiController from './api.controller';

const apiRouter = (): express.Router => {
  const router = express.Router();

  router.get('/', apiController);

  return router;
};

export default apiRouter;
