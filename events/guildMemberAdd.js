const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(member)
        const isBot = member.user.bot
        try {
            if(!isBot) return
            const user = await sender.info(member, sender.audit.BotAdd) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, PM.flags.Administrator)
            
            const targetMember = await sender.getUser(user.executorId, member)

            if(!user || !targetMember) return await interaction.reply('Kullanıcı bulunamadı!')
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            await targetMember.ban({
                reason: 'Bot eklerken banlandı'
            }).then(async()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: member,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Bot Log',
                    description: `<@${user.executorId}>, **${targetMember.displayName}** adlı botu eklediği için banlandı.`,
                },PM.config.LogChannel)
                return;
            }).catch((err)=> console.log(err.message))

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}