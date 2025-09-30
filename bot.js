import { Client, Partials } from 'discord.js';
import { Base } from "#libs"
import { itentsAll } from "#helpers"

const startBot = async () => {
    
    const client = new Client({
        intents: itentsAll(),
        partials: [Partials.Message, Partials.Channel, Partials.User]
    })

    const base = new Base(client, process.env.TOKEN, process.env.BOT_ID)
    await base.loaders()
    base.connect()
}

export default startBot;