import bot from '#bot'
import { guildConfigUpdate, addItemToGuildConfig, removeItemFromGuildConfig } from '#services'

const getServersFromBot = async ()=>{
    try {
		const servers = bot.client.guilds.cache; // No await needed for cache, it's synchronous
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
		console.error("[ERROR | BotService/getServersFromBot]: ", err);
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const getServerById = async (values)=>{
	const { guildId } = values.params;
    try {
		const server = await bot.client.guilds.fetch(guildId);
		const roles = await server.roles.fetch();
        const channels = await server.channels.fetch();
        const members = await server.members.fetch();
		
		// Convert discord.js Collections to plain objects/arrays for JSON serialization
		const serializeCollection = (coll) => {
			const arr = [];
			coll.forEach(item => arr.push(item.toJSON()));
			return arr;
		};
		
        return {
            success: true,
			message: 'Sunucu bilgileri çekildi',
			data: {
				roles: serializeCollection(roles),
				channels: serializeCollection(channels),
				members: serializeCollection(members),
			},
			code: 200
        }
    } catch (err) {
		console.error("[ERROR | BotService/getServerById]: ", err);
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}


const guildSettingsAdd = async (values)=>{
	console.log("DEBUG guildSettingsAdd values:", JSON.stringify(values, null, 2));
	const { guildId } = values.params
	const data = values.body
	console.log("DEBUG guildSettingsAdd guildId:", guildId, "data:", data);
    try {
		const guildConfig = await addItemToGuildConfig(guildId, data)
		console.log("DEBUG guildSettingsAdd guildConfig:", JSON.stringify(guildConfig, null, 2));
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
		console.error("[ERROR | BotService/guildSettingsAdd]: ", err);
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const guildSettingsRemove = async (values)=>{
	console.log("DEBUG guildSettingsRemove values:", JSON.stringify(values, null, 2));
	const { guildId } = values.params
	const data = values.body
	console.log("DEBUG guildSettingsRemove guildId:", guildId, "data:", data);
    try {
		const guildConfig = await removeItemFromGuildConfig(guildId, data)
		console.log("DEBUG guildSettingsRemove guildConfig:", JSON.stringify(guildConfig, null, 2));
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
		console.error("[ERROR | BotService/guildSettingsRemove]: ", err);
        return {
			success: false,
			message: err.message,
			error: err,
			code: 400
		}
    }
}

const guildSettingsUpdate = async (values)=>{
	
	console.log("DEBUG guildSettingsUpdate values: ", JSON.stringify(values, null, 2));
	
	const { guildId } = values.params
	const data = values.body
	
	console.log("DEBUG guildSettingsUpdate guildId: ", guildId);
	console.log("DEBUG guildSettingsUpdate data: ", JSON.stringify(data, null, 2));
	
    try {
		const guildConfig = await guildConfigUpdate(guildId, data)
		
		console.log("DEBUG guildSettingsUpdate guildConfig: ", JSON.stringify(guildConfig, null, 2));

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
		console.error("[ERROR | BotService/guildSettingsUpdate]: ", err)
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