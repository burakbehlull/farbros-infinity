const { Events } = require('discord.js')
const { Timer } = require('../jobs/timer')
const { backup } = require('../config.json')

module.exports = {
	name: Events.ClientReady,
	async execute(member, client) {
        if(!backup.roleBackup) return
        const file = await Timer(member, true)
        if (file.executeOnLoaded) {
            setInterval(async ()=> await file.execute(), file.time)
        }
    }
}