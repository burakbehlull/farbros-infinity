import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "channelDelete", 
  async execute(client, channel) {
    try {
        const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: channel
		});
		
		const control = await authority.control({
			audit: audit.ChannelDelete, 
			levels: ["mid"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		const newChannel = await channel.guild.channels.create({
			name: channel.name,
			type: channel.type,
			parent: channel.category?.id || null, 
			position: channel.position,
			topic: channel.topic || null,
			nsfw: channel.nsfw || false,
			rateLimitPerUser: channel.rateLimitPerUser || 0,
			bitrate: channel.bitrate || undefined,
			userLimit: channel.userLimit || undefined,
			permissionOverwrites: channel.permissionOverwrites.cache.map(o => ({
			  id: o.id,
			  allow: o.allow.bitfield,
			  deny: o.deny.bitfield,
			  type: o.type
			}))
		});
		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Channel Guard -> Channel Delete',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${channel}** (${channel.id}) kanalını sildi. Yeni kanal oluşturuldu: ${newChannel} ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling channel deletion:', error);
    }
  },
};
