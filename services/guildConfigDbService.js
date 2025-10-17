import { GuildConfig } from "#models"

async function createGuildConfig(guildId){
	const exist = await GuildConfig.findOne({guildId})
	if(exist) return {
		success: false,
		message: 'Aynı guild var!'
	}
	const guildConfig = await GuildConfig.create({guildId})
	
	return {
		success: true,
		message: 'Döküman yaratıldı.',
		data: guildConfig
	}
	
}

async function guildConfigFindById(guildId){
	const data = await GuildConfig.findOne({guildId})
	if (!data) return {
		success: false,
		message: 'Böyle bir guild yok'	
	}
	return {
		success: true,
		message: 'Döküman çekildi.',
		data: data
	}	
}

async function guildConfigUpdate(guildId, data){
	const guildConfig = await GuildConfig.findOne({guildId})
	
	if(data.enable) guildConfig.enable = data.enable
	if(data.prefix) guildConfig.prefix = data.prefix
	if(data.logChannelId) guildConfig.logChannelId = data.logChannelId
	if(data.jailRoleId) guildConfig.jailRoleId = data.jailRoleId
	if(data.punishmentType) guildConfig.punishmentType = data.punishmentType
	
	const result = await data.save()
	
	if (!data) return {
		success: false,
		message: 'Böyle bir guild yok'	
	}
	return {
		success: true,
		message: 'Döküman güncellendi.',
		data: result
	}	
}


async function addItemToGuildConfig(guildId, {level, type, data}){
	
	let guildConfig = await GuildConfig.findOne({ guildId });
	if (!guildConfig) {
	  guildConfig = new GuildConfig({ guildId });
	}
	
	const mode = guildConfig[level]
	const result = mode[type]
	
	switch(type){
		case 'members':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu üye zaten var!'	
			}
			result.push(data)
			await guildConfig.save()
			return {
				success: true,
				message: 'Üye eklendi.'	
			}
		case 'authorities':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu yetki zaten tanımlanmış!'	
			}
			result.push(data)
			await guildConfig.save()
			return {
				success: true,
				message: 'Yetki eklendi.'	
			}
		case 'roles':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu rol zaten var!'	
			}
			result.push(data)
			await guildConfig.save()
			return {
				success: true,
				message: 'Rol eklendi.'	
			}
		case 'enable':
			mode.enable = data
			await guildConfig.save()
			return {
				success: true,
				message: 'Enable güncellendi'	
			}
		case 'isAuthorities':
			mode.isAuthorities = data
			await guildConfig.save()
			return {
				success: true,
				message: 'Authority enable güncellendi'	
			}
		
	}
	
}

export {
	createGuildConfig,
	guildConfigFindById,
	addItemToGuildConfig,
	guildConfigUpdate
}