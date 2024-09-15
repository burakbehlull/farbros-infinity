const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.ChannelUpdate,
	async execute(oldChannel, newChannel, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(oldChannel)
        try {
            if(!PM.config.isChannelUpdate) return

            const user = await sender.info(oldChannel, sender.audit.ChannelUpdate) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            
            const member = await sender.getUser(user.executorId, oldChannel)

            console.log(user.executorId === process.env.BOT_ID)
            if (user.executorId === process.env.BOT_ID) return;

            if(!user || !member) {
                console.log('Kullanıcı bulunamadı!')
                return;
            }

            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;

            if (newChannel.type === 0) {
                if (oldChannel.name !== newChannel.name || oldChannel.type !== newChannel.type ||
                    oldChannel.topic !== newChannel.topic || oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
                    const permissionOverwrites = oldChannel.permissionOverwrites ? oldChannel.permissionOverwrites.cache.map(
                        overwrite => ({
                            id: overwrite.id,
                            allow: overwrite.allow.bitfield.toString(),
                            deny: overwrite.deny.bitfield.toString(),
                        })) : []
                    await newChannel.edit({
                        name: oldChannel.name,
                        type: oldChannel.type,
                        rateLimitPerUser: oldChannel.rateLimitPerUser,
                        nsfw: oldChannel.nsfw,
                        topic: oldChannel.topic,
                        permissionOverwrites,
                    })
                }
            } else if (newChannel.type === 2){
                // voice
                await newChannel.edit({
                    name: oldChannel.name,
                    userLimit: oldChannel.userLimit
                })
            } else if(newChannel.type === 4) {
                // category 
                await newChannel.edit({
                    name: oldChannel.name
                })
            }

            await member.ban({
                reason: 'Kanalın özelliklerini değiştirirken banlandı'
            }).then(async ()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: oldChannel,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Channel Log',
                    description: `<@${user.executorId}>, **${oldChannel.name}** adlı kanalın özelliklerini değiştirdiği için banlandı.`,
                },PM.config.LogChannel)
                return;
            }).catch((err)=> console.log(err.message))

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}