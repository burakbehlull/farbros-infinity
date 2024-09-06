const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")


module.exports = {
	name: Events.GuildUpdate,
	async execute(oldGuild, newGuild, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(oldGuild)
        try {
            const user = await sender.info(oldGuild, sender.audit.GuildUpdate, true) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId,true)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator], true)
            
            const member = await sender.getUser(user.executorId, oldGuild, "FETCH")
            
            if (user.executorId === process.env.BOT_ID) return;

            if(!user || !member) {
                console.log('Kullanıcı bulunamadı!')
                return;
            }

            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            // VANITY URL
            if(oldGuild.vanityURLCode!==newGuild.vanityURLCode) {
                const urlChange = await fetch(`https://discord.com/api/v10/guilds/${newGuild.id}/vanity-url`,{
                    method: "PATCH",
                    headers: { 
                        'Authorization': `${process.env.ACCOUNT_TOKEN}`, 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: `${process.env.VANITY_URL}`})
                })
    
                await member.ban({
                    reason: 'Sunucu özelliklerini değiştirirken banlandı'
                }).then(async ()=>{
                    console.log('Kullanıcı banlandı.')
                    await sender.send({
                        interaction: oldGuild,
                        isEmbed: true,
                        templateEmbed: true,
                        title: 'Guild Log',
                        description: `<@${user.executorId}>, Sunucu özelliklerini değişirken banlandı.`,
                    },PM.config.LogChannel)
                }).catch((err)=> console.log(err.message))
            }
            // SERVER CHANGE
            if(oldGuild.name !== newGuild.name || oldGuild.bannerURL() !== newGuild.bannerURL() || oldGuild.iconURL() !== newGuild.iconURL()){
                await newGuild.edit({ 
                    name: oldGuild.name, 
                    icon: oldGuild.iconURL({ dynamic: true }), 
                    banner: oldGuild.bannerURL()
                })

                await member.ban({
                    reason: 'Sunucu özelliklerini değiştirirken banlandı'
                }).then(async ()=>{
                    console.log('Kullanıcı banlandı.')
                    await sender.send({
                        interaction: oldGuild,
                        isEmbed: true,
                        templateEmbed: true,
                        title: 'Guild Log',
                        description: `<@${user.executorId}>, Sunucu özelliklerini değiştirmeye çalırken banlandı.`,
                    },PM.config.LogChannel)
                }).catch((err)=> console.log(err.message))                
            }
            

        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}