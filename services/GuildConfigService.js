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
		message: 'Döküman yaratıldı.'
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
		message: 'Döküman yaratıldı.'
	}
	
}

export {
	createGuildConfig,
	guildConfigFindById
}