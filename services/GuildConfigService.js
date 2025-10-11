import { GuildConfig } from "#models"

async function createGuildConfig(guildId){
	const exist = await guildConfig.findOne({guildId})
	if(exist) return {
		success: false,
		message: 'Aynı guild var!'
	}
	const guildConfig = await GuildConfig.create({guildId})
	
	return {
		success: true,
		message: 'Döküman yaratıldı.',
		data: exist
	}
	
}

async function guildConfigFindById({guildId}){
	const data = await guildConfig.findOne({guildId})
	if (data) return {
		success: false,
		message: 'Böyle bir guild yok'	
	}
	return {
		success: true,
		message: 'Döküman yaratıldı.',
		data: data
	}	
}

async function addItemToGuildConfig({guildId, level, type, data}){
	const modConfig = await ModConfig.findOne({guildId});
	if (!modConfig) {
	  modConfig = new ModConfig({ guildId });
	}
	
	const mode = modConfig[level]
	const result = mode[type]
	
	switch(type){
		case 'members':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu üye zaten var!'	
			}
			result.push(data)
			await modConfig.save()
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
			await modConfig.save()
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
			await modConfig.save()
			return {
				success: true,
				message: 'Rol eklendi.'	
			}
		case 'enable':
			mode.enable = data
			await modConfig.save()
			return {
				success: true,
				message: 'Enable güncellendi'	
			}
		case 'isAuthorities':
			mode.isAuthorities = data
			await modConfig.save()
			return {
				success: true,
				message: 'Authority enable güncellendi'	
			}
		
	}
	
}

export {
	createGuildConfig,
	guildConfigFindById,
	addItemToGuildConfig
}