import { guildSettingsUpdate, guildSettingsAdd, guildSettingsRemove, getServerById } from '#services'
import { Action } from '#base'

const GuildSettingsUpdate = (req, res)=> new Action(req, res, {service: guildSettingsUpdate, sync: true})
const GuildSettingsAdd = (req, res)=> new Action(req, res, {service: guildSettingsAdd, sync: true})

const GuildSettingsRemove = (req, res)=> new Action(req, res, {service: guildSettingsRemove, sync: true})
const GetServerById = (req, res)=> new Action(req, res, {service: getServerById, sync: true})

export {
	
	GuildSettingsUpdate,
	GuildSettingsAdd,
	GuildSettingsRemove,
	GetServerById
}