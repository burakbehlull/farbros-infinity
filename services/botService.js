import bot from '#bot'
import { guildConfigUpdate, addItemToGuildConfig } from '#services'

const getServersFromBot = async ()=>{
    try {
		const servers = await bot.client.guilds.cache
		if(!servers) return {
            success: false,
			message: 'Bot sunucuları bulunamadı',
			code: 400
        }
        return {
            success: true,
			message: 'Bot sunucuları çekildi',
			data: servers,
			code: 200
        }
    } catch (err) {
		console.log("[ERROR | BotService/getServersFromBot]: ", err)
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const getServerById = async (values)=>{
	const { guildId } = values.params
    try {
		const server = await bot.client.guilds.fetch(guildId)
		
		const roles = await server.roles.fetch()
        const channels = await server.channels.fetch()
        const members = await server.members.fetch()
		
		if(!servers || !guildId) return {
            success: false,
			message: 'Sunucu bulunamadı',
			code: 400
        }
        return {
            success: true,
			message: 'Bot sunucuları çekildi',
			data: {
				roles: roles,
				channels: channels,
				members: members,
			},
			code: 200
        }
    } catch (err) {
		console.error("[ERROR | BotService/getServerById]: ", err)
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}


const guildSettingsAdd = async (values)=>{
	
	const { guildId } = values.params
	const { data } = values.data
	
    try {
		const guildConfig = await addItemToGuildConfig(guildId, data)

		if(!guildConfig.success) return {
            success: false,
			message: 'Sunucu değerleri güncellenemedi.',
			code: 400
        }
        return {
            success: true,
			message: 'Sunucu değerleri güncellendi.',
			data: guildConfig,
			code: 200
        }
    } catch (err) {
		console.log("[ERROR | BotService/addItemToGuildConfig]: ", err)
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const guildSettingsRemove = async (values)=>{
	
	const { guildId } = values.params
	const { data } = values.data
	
    try {
		const guildConfig = await removeItemFromGuildConfig(guildId, data)

		if(!guildConfig.success) return {
            success: false,
			message: 'Sunucu değerleri güncellenemedi.',
			code: 400
        }
        return {
            success: true,
			message: 'Sunucu değerleri güncellendi.',
			data: guildConfig,
			code: 200
        }
    } catch (err) {
		console.log("[ERROR | BotService/removeItemFromGuildConfig]: ", err)
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const guildSettingsUpdate = async (values)=>{
	
	const { guildId } = values.params
	const { data } = values.data
	
    try {
		const guildConfig = await guildConfigUpdate(guildId, data)

		if(!guildConfig.success) return {
            success: false,
			message: 'Sunucu değerleri güncellenemedi.',
			code: 400
        }
        return {
            success: true,
			message: 'Sunucu değerleri güncellendi.',
			data: guildConfig,
			code: 200
        }
    } catch (err) {
		console.log("[ERROR | BotService/guildSettingsUpdate]: ", err)
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

export {
	
	getServersFromBot,
	
	guildSettingsAdd,
	guildSettingsUpdate,
	guildSettingsRemove,
	getServerById
}