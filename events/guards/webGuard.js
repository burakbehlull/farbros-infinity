import Manager from "#managers";
import { themes, penalties } from '#data'

export default {
  name: "presenceUpdate",
  async execute(client, oldPresence, newPresence) {
    try {
		if(!oldPresence?.guild) return
		
		const { authority, theme: tb, punish, flags } = new Manager(client, {
			action: oldPresence
		});
		
		const isEnable = await authority.isEnable("webGuard")
		if(!isEnable) return
		
		const web = newPresence?.clientStatus?.web
		if(!web) return
		
		const newUserId = oldPresence.userId
		
		const control = await authority.control({
			newUserId, 
			levels: ["mid", "low"]
		})
		
		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId, {
			choose: penalties.removeAuthorities,
			permissions: [flags.Administrator, flags.ManageRoles, flags.ManageGuild, 
				flags.ManageChannels, flags.KickMembers, flags.BanMembers
			]
		})

		const user = await tb.getUser(userId)

		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Web Guard -> Web Entry',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user}, webten girdiği için yetkileri alındı. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
		
		
	
    } catch (error) {
        console.error('Error handling web update:', error);
    }
  },
};
