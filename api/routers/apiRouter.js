import express from 'express';

const apiRouter = express.Router();

import { botRoute } from "#routers"

apiRouter.use('/bots', botRoute)

export default apiRouter;

