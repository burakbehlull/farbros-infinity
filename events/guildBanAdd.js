const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildBanAdd,
	async execute(guild, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(guild)
        try {
            const user = await sender.info(guild, sender.audit.MemberBanAdd, true) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId,true)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator], true)
            
            const member = await sender.getUser(user.executorId, guild, "FETCH")
            
            if (user.executorId === process.env.BOT_ID) return;

            if(!user || !member) {
                console.log('Kullanıcı bulunamadı!')
                return;
            }

            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            

            await member.ban({
                reason: 'Sunucu özelliklerini değiştirirken banlandı'
            }).then(async ()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: guild,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Ban Log',
                    description: `<@${user.executorId}>, Sunucu özelliklerini değiştirmeye çalırken banlandı.`,
                },PM.config.LogChannel)
            }).catch((err)=> console.log(err.message))                
            
            

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}