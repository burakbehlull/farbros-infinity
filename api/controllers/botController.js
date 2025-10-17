import { getServersFromBot } from '#services'
import { Action } from '#base'

const GetServers = (req, res)=> new Action(req, res, {service: getServersFromBot, sync: true})


export {
	GetServers
}