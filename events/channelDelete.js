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
            const authority = await PM.isAuthority(user.executorId, PM.flags.ManageRoles)
            
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}