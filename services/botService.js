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
	guildSettingsUpdate
}