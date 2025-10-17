import express from 'express';
import { GuildSettingsAdd, GuildSettingsUpdate } from '#controllers';

const router = express.Router();

router.get('/', (req,res)=> res.send('server route'))

router.post('/server/:guildId', GuildSettingsAdd);
router.put('/server/:guildId', GuildSettingsUpdate);


export default router;
