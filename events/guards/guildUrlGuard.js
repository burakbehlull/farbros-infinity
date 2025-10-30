import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "guildUpdate",
  async execute(client, oldGuild, newGuild) {
    try {
		
		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: oldGuild
		});
		
		if (oldGuild.vanityURLCode === newGuild.vanityURLCode) return;
		
		const isEnable = await authority.isEnable("guildUrlGuard")
		if(!isEnable) return
		
		const control = await authority.control({
			audit: audit.GuildUpdate, 
			levels: ["high"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		const vanityURL = process.env.VANITY_URL || null
		const accountToken = process.env.ACCOUNT_TOKEN || null
		
		if(!vanityURL || !accountToken) {
			console.warn("Vanity URL ya da Account Token tanımlanmamış!")
			return
		}
		
		
        await fetch(`https://discord.com/api/v10/guilds/${newGuild.id}/vanity-url`,{
            method: "PATCH",
            headers: { 
                'Authorization': `${accountToken}`, 
                'Content-Type': 'application/json'
			},
            body: JSON.stringify({code: `${vanityURL}`})
        })
    
		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'URL Guard -> URL Change',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, URL'yi değiştirmeye çalıştı. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling guild url update :', error);
    }
  },
};
