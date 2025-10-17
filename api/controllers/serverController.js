import { guildSettingsUpdate } from '#services'
import { Action } from '#base'

const GuildSettingsUpdate = (req, res)=> new Action(req, res, {service: guildSettingsUpdate, sync: true})


export {
	GuildSettingsUpdate
}