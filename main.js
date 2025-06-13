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
base.loadJobs()

base.login()