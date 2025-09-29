import { Client, Partials } from 'discord.js';
import 'dotenv/config'

import { Base } from "#libs"
import { itentsAll } from "#helpers"

import { db } from "#config"

const client = new Client({
    intents: itentsAll(),
	partials: [Partials.Message, Partials.Channel, Partials.User]
})

db()

const base = new Base(client)
await base.loaders()