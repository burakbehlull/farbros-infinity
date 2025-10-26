import { guildSettingsUpdate, guildSettingsAdd, guildSettingsRemove } from '#services'
import { Action } from '#base'

const GuildSettingsUpdate = (req, res)=> new Action(req, res, {service: guildSettingsUpdate, sync: true})
const GuildSettingsAdd = (req, res)=> new Action(req, res, {service: guildSettingsAdd, sync: true})

const GuildSettingsRemove = (req, res)=> new Action(req, res, {service: guildSettingsRemove, sync: true})


export {
	
	GuildSettingsUpdate,
	GuildSettingsAdd,
	GuildSettingsRemove
}