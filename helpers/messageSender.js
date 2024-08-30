import { EmbedBuilder } from "discord.js";
export class messageSender {
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
}