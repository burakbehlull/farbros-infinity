import { Client, Partials } from 'discord.js';
import 'dotenv/config'

import { Base } from "#libs"
import { misc } from "#helpers"

import { db } from "#config"

const client = new Client({
    intents: misc.itentsAll(),
	partials: [Partials.Message, Partials.Channel, Partials.User]
})

db()

const base = new Base(client)
base.loadCommands()
base.loadEvents()
base.connect()