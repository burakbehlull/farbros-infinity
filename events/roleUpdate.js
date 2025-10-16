import Manager from "#managers";
import { themes } from '#data'

export default {
  name: "roleUpdate", 
  async execute(client, oldRole, newRole) {
    try {
		const { authority, theme: tb, audit, punish } = new Manager(client, {
			action: oldRole
		});
		
		const control = await authority.control({
			audit: audit.RoleUpdate, 
			levels: ["low"]
		})

		if(control.status) return
		
		const userId = control.userId
		
		const punishment = await punish.execute(userId)

		if (oldRole.name !== newRole.name || oldRole.color !== newRole.color || oldRole.permissions !== newRole.permissions, oldRole !== newRole) {
            await newRole.edit({...oldRole})
        }

		
		const user = await tb.getUser(userId)
		
		const theme = await tb.embedThemeBuilder(themes.success, {
			  action: true,
			  title: 'Role Guard -> Role Update',
			  author: tb.getNameAndAvatars("guild"),
			  description: `${user} kullanıcı, **${oldRole}** (${oldRole.id}) rolünü güncelledi. Rol yeniden eski haline döndürüldü. ${punishment?.success ? punishment?.message : ''}`,
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		await theme.log()
	
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
