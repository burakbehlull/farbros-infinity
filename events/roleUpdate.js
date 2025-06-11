const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildRoleUpdate,
	async execute(oldRole, newRole, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(oldRole)
        try {
            if(!PM.config.isRoleUpdate) return

            const user = await sender.info(oldRole, sender.audit.RoleUpdate) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            console.log(owner, roles, authority)
            const member = await sender.getUser(user.executorId, oldRole)

            if (user.executorId === process.env.BOT_ID) return;

            if(!user || !member) {
                console.log('Kullanıcı bulunamadı!')
                return;
            }

            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            if (oldRole.name !== newRole.name || oldRole.color !== newRole.color || oldRole.permissions !== newRole.permissions, oldRole !== newRole) {
                await newRole.edit({...oldRole})
            }
			
			await console.log("update")
			/*
            await member.ban({
                reason: 'Rolü değiştirirken banlandı'
            }).then(async ()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: oldRole,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Role Log',
                    description: `<@${user.executorId}>, **${oldRole.name}** adlı rolü değiştirdiği için banlandı.`,
                },PM.config.LogChannel)
                return;
            }).catch((err)=> console.log(err.message))
			*/
        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}