import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "guildMemberAdd",
  async execute(client, member) {
    try {
		
		const isBot = member.user.bot
		if(!isBot) return

		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: member
		});
		
		const isEnable = await authority.isEnable("botAddGuard")
		if(!isEnable) return
		
		const control = await authority.control({
			audit: audit.BotAdd, 
			levels: ["high"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		await member.ban({
            reason: 'İzinsiz bot'
        })

		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Bot Guard -> Bot Add',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${member}** (${member?.id}) botu ekledi. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling bot add:', error);
    }
  },
};
