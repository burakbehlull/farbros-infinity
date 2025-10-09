import { Client } from 'discord.js';
import { Base } from "#libs"
import { itentsAll } from "#helpers"

const startBot = async () => {
    
    const client = new Client({
        intents: itentsAll()
    })

    const base = new Base(client, process.env.TOKEN, process.env.BOT_ID)
    await base.loaders()
    base.connect()
	
	return base
}

export default startBot;