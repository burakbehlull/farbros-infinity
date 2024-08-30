const { EmbedBuilder, AuditLogEvent } = require("discord.js")
class MessageSender {
    constructor(client){
        this.client = client
        this.audit = AuditLogEvent
    }

    embed({ title, color=0x0099FF,footer }){
        const guild = this.client

        const IFooter = footer ?? { text: guild.user.displayName, iconURL: guild.user.avatarURL()}
        const IEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setTimestamp()
        .setFooter(IFooter)
        return IEmbed
    }

    async info(child, type, firstOnce){

        try {
            let logs;
            if(firstOnce){
                logs = await child.fetchAuditLogs({limit:1,type: type})
            } else {
                logs = await child?.guild.fetchAuditLogs({limit:1,type: type})
            }
            const log = logs.entries.first()
            return log
        } catch (err) {
            console.log("Hata:", err.message)
        }
    }
    
}

module.exports = {
    MessageSender
}
