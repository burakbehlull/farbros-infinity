
export default class PunishManager {
    constructor(client, action, options) {
        this.client = client
		this.options = options 
		this.action = action
		this.guild = action.guild
	}
	
    async ban(userId, reason){
		try {
			const action = this.guild
			
			const member = action.members.cache.get(userId)
			const result = await member.ban({reason})
			
			return {
				success: true,
				data: result
			}
		} catch(err){
			console.error("[punishManager / ban]: ", err)
			return {
				success: false,
				error: err
			}
		}
       
    }

    async deleteAuthorityRoles(userId, permissions){
		try {
			const member = await this.guild.members.cache.get(userId)
			if (!member) {
				console.error('Kullanıcı bulunamadı!')
				return;
			}

			if(!permissions){
				console.error('Yetkiler tanımlanmamış!')
				return
			}
		
			const rolesWithPermissions = []
		
			for (const role of member.roles.cache.values()) {
				const hasPermission = permissions.every(permission => role.permissions.has(permission))
				
				if (hasPermission) {
					rolesWithPermissions.push(role)
				}
			}
		
			if (rolesWithPermissions.length === 0) return

            for (const role of rolesWithPermissions) {
                await member.roles.remove(role)
            }
			
			return {
				success: true,
				data: result
			}
		} catch(err){
			console.error("[punishManager / ban]: ", err)
			return {
				success: false,
				error: err
			}
		}
       
    }


}