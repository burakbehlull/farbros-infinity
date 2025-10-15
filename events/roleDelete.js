import Manager from "#managers";

import { themes } from '#data'

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
		
        const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: role
		});
		
		const control = await authority.control({
			audit: audit.RoleDelete, 
			levels: ["high"]
		})
		
		const userId = control.userId
		
		
		
		if(!control.status) punish.execute(userId)
			
		await role.guild.roles.create({
            name: role.name,
            color: role.color,
            permissions: role.permissions || [],
			...role,
            reason: 'Silinen rol geri yüklendi.'
        })
		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Role Guard -> Role Delete',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${role.name}** (${role.id}) rolünü sildiği için cezalandırıldı.`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
		
	} catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
