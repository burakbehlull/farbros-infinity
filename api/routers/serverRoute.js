import express from 'express';
import { GuildSettingsAdd, GuildSettingsUpdate, GuildSettingsRemove, getServerById } from '#controllers';

const router = express.Router();

router.get('/', (req,res)=> res.send('server route'))

router.post('/config/:guildId', GuildSettingsAdd);
router.delete('/config/:guildId', GuildSettingsRemove);

router.get('/:guildId', GetServerById);
router.put('/:guildId', GuildSettingsUpdate);


export default router;
