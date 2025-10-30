import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "channelDelete", 
  async execute(client, oldChannel, newChannel) {
    try {
        const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: oldChannel
		});
		
		const isEnable = await authority.isEnable("channelUpdateGuard")
		if(!isEnable) return
		
		const control = await authority.control({
			audit: audit.ChannelUpdate, 
			levels: ["low"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		if (newChannel.type === 0) {
			// text channel
            if (oldChannel.name !== newChannel.name || oldChannel.type !== newChannel.type ||
                oldChannel.topic !== newChannel.topic || oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
				const permissionOverwrites = oldChannel.permissionOverwrites ? oldChannel.permissionOverwrites.cache.map(
                    overwrite => ({
                        id: overwrite.id,
                        allow: overwrite.allow.bitfield.toString(),
                        deny: overwrite.deny.bitfield.toString(),
                    })) : []
				await newChannel.edit({
                    name: oldChannel.name,
                    type: oldChannel.type,
                    rateLimitPerUser: oldChannel.rateLimitPerUser,
					nsfw: oldChannel.nsfw,
                    topic: oldChannel.topic,
                    permissionOverwrites,
                })
            }
        } else if (newChannel.type === 2){
            // voice channel
            await newChannel.edit({
                name: oldChannel.name,
                userLimit: oldChannel.userLimit
            })
        } else if(newChannel.type === 4) {
            // category 
            await newChannel.edit({
                name: oldChannel.name
            })
        }
		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Channel Guard -> Channel Update',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${channel}** (${oldChannel.id}) kanalını sildi. Kanal eski haline getirildi. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling channel deletion:', error);
    }
  },
};
