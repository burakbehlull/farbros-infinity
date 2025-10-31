import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "guildMemberRemove",
  async execute(client, member) {
    try {

		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: member
		});
		
		const isEnable = await authority.isEnable("kickGuard")
		if(!isEnable) return
		
		const control = await authority.control({
			audit: audit.MemberKick, 
			levels: ["mid"]
		})
		
		if(control.status) return
		
		const userId = control.userId
		
		const isLimit = await authority.getKickBanLimit(userId)
		if(isLimit) return
		
		const punishment = await punish.execute(userId, { reason: 'Sağ tık kick' })

		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Kick Guard -> Kick Add',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${member}** (${member?.id}) adlı kullanıcıyı kickledi. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling kick add:', error);
    }
  },
};
