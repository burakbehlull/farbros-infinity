import { API } from '@api';

const botAPI = {
    servers: () => API.get('/bots/servers', data)
}

const serverAPI = {
    addSafeItemConfig: (guildId, data) => API.post(`/servers/config/${guildId}`, data),
    removeSafeItemConfig: (guildId, data) => API.delete(`/servers/config/${guildId}`, data),
    updateGuildConfig: (guildId, data) => API.put(`/servers/${guildId}`, data),
}

export {
	botAPI,
	serverAPI
}

