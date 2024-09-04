const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildRoleDelete,
	async execute(role, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(role)
        try {
            const user = await sender.info(role, sender.audit.RoleDelete) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, PM.flags.Administrator)
            
            const member = await sender.getUser(user.executorId, role)

            if(!user || !member) return await interaction.reply('Kullanıcı bulunamadı!')
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            await member.ban({
                reason: 'Role silerken banlandı'
            }).then(async ()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: role,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Role Log',
                    description: `<@${user.executorId}>, **${role.name}** adlı odayı sildiği için banlandı.`,
                },PM.config.LogChannel)
                return;
            }).catch((err)=> console.log(err.message))

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}