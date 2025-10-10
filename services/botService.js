import bot from '#bot'

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

export {
	getServersFromBot
}