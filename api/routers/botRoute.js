import express from 'express';
import { GetServers } from '#controllers';

const router = express.Router();

router.get('/', (req,res)=> res.send('bot route'));
router.get('/servers', GetServers);


export default router;
