import { guildSettingsUpdate, guildSettingsAdd } from '#services'
import { Action } from '#base'

const GuildSettingsUpdate = (req, res)=> new Action(req, res, {service: guildSettingsUpdate, sync: true})
const GuildSettingsAdd = (req, res)=> new Action(req, res, {service: guildSettingsAdd, sync: true})


export {
	
	GuildSettingsUpdate,
	GuildSettingsAdd
}