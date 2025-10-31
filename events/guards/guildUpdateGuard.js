import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "guildUpdate",
  async execute(client, oldGuild, newGuild) {
    try {
		
		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: oldGuild
		});
		
		if (oldGuild.name === newGuild.name && oldGuild.bannerURL() === newGuild.bannerURL() &&oldGuild.iconURL() === newGuild.iconURL()) return;

		const isEnable = await authority.isEnable("guildUpdateGuard")
		if(!isEnable) return
		
		
		const control = await authority.control({
			audit: audit.GuildUpdate, 
			levels: ["mid"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)
		
        await newGuild.edit({ 
			name: oldGuild.name, 
            icon: oldGuild.iconURL({ dynamic: true }), 
            banner: oldGuild.bannerURL()
		})
		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Guild Guard -> Guild Change',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, Sunucu ayarlarını değiştirmeye çalıştı. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling guild update: ', error);
    }
  },
};
