import express from 'express';
import { GetServers } from '#controllers';

const router = express.Router();

router.get('/servers', GetServers);


export default router;
