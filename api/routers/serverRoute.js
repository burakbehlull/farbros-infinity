import express from 'express';
import { GuildSettingsAdd, GuildSettingsUpdate, GuildSettingsRemove, GetServerById, GetGuildSettings } from '#controllers';

const router = express.Router();

router.get('/config/:guildId', GetGuildSettings);

router.post('/config/:guildId', GuildSettingsAdd);
router.delete('/config/:guildId', GuildSettingsRemove);

router.get('/:guildId', GetServerById);
router.put('/:guildId', GuildSettingsUpdate);


export default router;
