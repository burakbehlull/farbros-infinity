const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
})

client.login(process.env.TOKEN)