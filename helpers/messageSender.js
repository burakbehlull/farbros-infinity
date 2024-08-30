import { EmbedBuilder } from "discord.js";
export default class MessageSender {
    constructor(client){
        this.client = client
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

    async info(type, firstOnce){
        const client = this.client

        try {
            let logs;
            if(firstOnce){
                logs = await client.fetchAuditLogs({limit:1,type: type})
            } else {
                logs = await client?.guild.fetchAuditLogs({limit:1,type: type})
            }
            const log = logs.entries.first()
            return log
        } catch (err) {
            console.log("Hata:", err.message)
        }
    }
    
}