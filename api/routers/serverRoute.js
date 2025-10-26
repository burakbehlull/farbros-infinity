import express from 'express';
import { GuildSettingsAdd, GuildSettingsUpdate, GuildSettingsRemove } from '#controllers';

const router = express.Router();

router.get('/', (req,res)=> res.send('server route'))

router.post('/server/penal/:guildId', GuildSettingsAdd);
router.delete('/server/penal/:guildId', GuildSettingsRemove);

router.put('/server/:guildId', GuildSettingsUpdate);


export default router;
