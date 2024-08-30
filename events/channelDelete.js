const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.ChannelDelete,
	async execute(channel, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(channel)
        try {
            const user = await sender.info(channel, sender.audit.ChannelDelete) 
            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            
            if(owner && PM.config.isOwner) return;
            if(roles && PM.config.isRoles) return;
            
            // guard codes

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}