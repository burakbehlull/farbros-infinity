const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(member)
        try {
            if(!PM.config.isKickGuard) return

            const user = await sender.info(member, sender.audit.MemberKick) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            const targetMember = await sender.getUser(user.executorId, member)
            
            if(!user || !targetMember) return;
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            
            if(user.target.id === member.id){
                const kickedUser = member.user.id
                await sender.send({
                    interaction: member,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Kick Log',
                    description: `<@${user.executorId}>, <@${kickedUser}> (${kickedUser}) adlı kişiyi kicklediği için banlandı.`,
                },PM.config.LogChannel)

                await targetMember.ban({
                    reason: 'Sağ tık Kick sebebiyle'
                })
            }


            

            return;

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}