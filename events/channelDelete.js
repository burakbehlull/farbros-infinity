const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.ChannelDelete,
	async execute(channel, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(channel)
        try {
            if(!PM.config.isChannelDelete) return
            
            const user = await sender.info(channel, sender.audit.ChannelDelete) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            
            const member = await sender.getUser(user.executorId, channel)

            if(!user || !member) return;
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            await member.ban({
                reason: 'Kanal silerken banlandı'
            }).then(async()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: channel,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Channel Log',
                    description: `<@${user.executorId}>, **${channel.name}** adlı odayı sildiği için banlandı.`,
                },PM.config.LogChannel)
                return;
            }).catch((err)=> console.log(err.message))

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}