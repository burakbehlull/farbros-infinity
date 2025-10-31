import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "guildBanAdd",
  async execute(client, guild) {
    try {

		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: guild
		});
		
		const isEnable = await authority.isEnable("banGuard")
		if(!isEnable) return
		
		const control = await authority.control({
			audit: audit.MemberBanAdd, 
			levels: ["mid"]
		})
		
		if(control.status) return
		
		const userId = control.userId
		
		const isLimit = await authority.getKickBanLimit(userId)
		if(isLimit) return
		
		const punishment = await punish.execute(userId)

		const user = await tb.getUser(userId)
		
		await user.ban({
            reason: 'Sağ Tık Ban'
        })
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Ban Guard -> Ban Add',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${member}** (${member?.id}) adlı kullanıcıyı banladı. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
		
		
	
    } catch (error) {
        console.error('Error handling ban add:', error);
    }
  },
};
