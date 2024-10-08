const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")

const User = require("../models/User")

module.exports = {
	name: Events.GuildBanAdd,
	async execute(guild, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(guild)
        try {
            if(!PM.config.isBanGuard) return

            const user = await sender.info(guild, sender.audit.MemberBanAdd) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            
            const member = await sender.getUser(user.executorId, guild)
            
            if (user.executorId === process.env.BOT_ID) return;

            if(!user || !member) {
                console.log('Kullanıcı bulunamadı!')
                return;
            }

            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            const m_user = await User.findOne({userID: user.executorId})

            if(!m_user){
                await User.create({userID: user.executorId, banLimit: 1})
            }

            m_user.banLimit = m_user.banLimit + 1;
            await m_user.save()
            
            if(m_user.banLimit >= PM.config.banLimit) {
                const i = guild; 
                await i.guild.members.unban(guild.user.id, "Otomatik unban")
                await member.ban({
                    reason: 'Ban sınırını aştığı için banlandı.'
                }).then(async ()=>{
                    await sender.send({
                        interaction: guild,
                        isEmbed: true,
                        templateEmbed: true,
                        title: 'Ban Log',
                        description: `<@${user.executorId}>, ban sırını aştığı için banlandı.\n<@${guild.user.id}>, banı açıldı.`,
                    },PM.config.LogChannel)
                }).catch((err)=> console.log(err.message)) 
                
                return;
            }

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}