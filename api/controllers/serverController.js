import { guildSettingsUpdate, guildSettingsAdd, guildSettingsRemove, getServerById, getGuildConfig } from '#services'
import { Action } from '#base'

const GetGuildSettings = (req, res)=> new Action(req, res, {service: getGuildConfig, sync: true})
const GuildSettingsUpdate = (req, res)=> new Action(req, res, {service: guildSettingsUpdate, sync: true})
const GuildSettingsAdd = (req, res)=> new Action(req, res, {service: guildSettingsAdd, sync: true})

const GuildSettingsRemove = (req, res)=> new Action(req, res, {service: guildSettingsRemove, sync: true})
const GetServerById = (req, res)=> new Action(req, res, {service: getServerById, sync: true})

export {
	GetGuildSettings,
	GuildSettingsUpdate,
	GuildSettingsAdd,
	GuildSettingsRemove,
	GetServerById
}