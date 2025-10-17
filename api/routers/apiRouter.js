import express from 'express';

const apiRouter = express.Router();

import { botRoute, serverRoute } from "#routers"

apiRouter.use('/bots', botRoute)
apiRouter.use('/servers', serverRoute)

export default apiRouter;

