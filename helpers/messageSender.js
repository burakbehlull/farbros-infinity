const { EmbedBuilder, AuditLogEvent, Embed } = require("discord.js")
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
    async getUser(userId, interaction){
        if(!userId) return
        const target = interaction ?? this.client
        const user = await target.guild.members.cache.get(userId)
        return user
    }
    async getChannel(channelId, interaction){
        if(!userId) return
        const target = interaction ?? this.client
        const channel = await target.guild.channels.cache.get(channelId)
        return channel
    }
    async send(embed={
        interaction: null,
        components: null,

        reply: false,
        text: undefined,
        isEmbed: false,
        title: undefined,
        description: undefined,
        timestamp: false,
        footer: undefined,
        color: undefined,
        image: undefined,
        thumbnail: undefined,
        fields: undefined
    }, channelId){
        const IEmbed = new EmbedBuilder()
        const target = embed.interaction ? embed.interaction : this.client
        const getChannel = this.client.guild.channels.cache.get(channelId)
        const channel = channelId ? getChannel : target.channel
        if(embed.isEmbed && !embed.text && !embed.reply){
            if(embed.title) IEmbed.setTitle(embed.title)
            if(embed.description) IEmbed.setDescription(embed.description)
            if(embed.timestamp) IEmbed.setTimestamp()
            if(embed.footer) IEmbed.setFooter(embed.footer)
            if(embed.color) IEmbed.setColor(embed.footer)
            if(embed.image) IEmbed.setImage(embed.image)
            if(embed.thumbnail) IEmbed.setThumbnail(embed.thumbnail)
            if(embed.fields) IEmbed.setFields(embed.fields)
            return await channel.send({ embeds: [IEmbed], components: embed.components })
        }
        if(embed.text && !embed.isEmbed && !embed.reply){
            return await channel.send({content: embed.text, components: embed.components})
        }
    }
    
}

module.exports = {
    MessageSender
}