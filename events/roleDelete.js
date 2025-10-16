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
			levels: ["mid"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		const newRole = await role.guild.roles.create({
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
			  description: `${user} kullanıcı, **${role.name}** (${role.id}) rolünü sildi. Rol yeniden oluşturuldu: ${newRole} ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
		
	} catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
