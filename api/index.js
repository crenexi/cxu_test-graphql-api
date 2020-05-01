const express = require('express');
const apiRouter = express.Router();

// Endpoint routers
const authRouter = require('./endpoints/auth');
const welcomeRouter = require('./endpoints/welcome');
const aboutRouter = require('./endpoints/about');
const handbookRouter = require('./endpoints/handbook');
const angeliRouter = require('./endpoints/angeli');
const charterRouter = require('./endpoints/charter');
const councilRouter = require('./endpoints/council');
const crewRouter = require('./endpoints/crew');
const hangarRouter = require('./endpoints/hangar');
const deckRouter = require('./endpoints/deck');
const readyRouter = require('./endpoints/ready');
const messRouter = require('./endpoints/mess');
const bridgeRouter = require('./endpoints/bridge');
const mediaRouter = require('./endpoints/media');
const libraryRouter = require('./endpoints/library');
const profileRouter = require('./endpoints/profile');
const modRouter = require('./endpoints/mod');
const beltRouter = require('./endpoints/belt');

// Should return API listing
apiRouter.get('/', (req, res) => {
  res.send('This is the Webb Universe API');
});

// Define endpoint routers
apiRouter.use('/', authRouter);
apiRouter.use('/', welcomeRouter);
apiRouter.use('/', aboutRouter);
apiRouter.use('/', handbookRouter);
apiRouter.use('/', angeliRouter);
apiRouter.use('/', charterRouter);
apiRouter.use('/', councilRouter);
apiRouter.use('/', crewRouter);
apiRouter.use('/', hangarRouter);
apiRouter.use('/', deckRouter);
apiRouter.use('/', readyRouter);
apiRouter.use('/', messRouter);
apiRouter.use('/', bridgeRouter);
apiRouter.use('/', mediaRouter);
apiRouter.use('/', libraryRouter);
apiRouter.use('/', profileRouter);
apiRouter.use('/', modRouter);
apiRouter.use('/', beltRouter);

module.exports = apiRouter;
