import { penalties } from '#data'
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
	
	async kick(userId, reason){
		try {
			const action = this.guild
			
			const member = action.members.cache.get(userId)
			const result = await member.kick({reason})
			
			return {
				success: true,
				data: result
			}
		} catch(err){
			console.error("[punishManager / kick]: ", err)
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
				success: true
			}
		} catch(err){
			console.error("[punishManager / ban]: ", err)
			return {
				success: false,
				error: err
			}
		}
       
    }

	async deleteUserRoles(userId) {
		try {
			const member = this.guild.members.cache.get(userId);
			if (!member) return false;

			const roles = member.roles.cache.filter((r) => r.id !== this.guild.id);
			if (roles.size === 0) return false;

			for (const role of roles.values()) {
				await member.roles.remove(role);
			}
			
			return {
				success: true
			}
		} catch (err) {
			console.error("[PunishManager / deleteUserRoles]:", error);
			return {
				success: false,
				error: err
			}
		}
	}
	
	async jail(userId) {
		const { guildConfigFindById } = await import("#services")
		
		try {
			const guildId = this.guild.id
			const guildConfig = await guildConfigFindById(guildId) 
			const jailRoleId = guildConfig?.data?.jailRoleId
			
			if(!jailRoleId){
				console.warn("Jail role id is null")
				return
			}
			
			const member = this.guild.members.cache.get(userId);
			if (!member) return false;

			await member.roles.add(jailRole);
			
			return {
				success: true,
			}
		} catch (error) {
			console.error("[PunishManager / jail]:", error);
			return false
		}
	}

	async execute(userId, {permissions=[], reason=null, choose=null}={}){
		
		const { guildConfigFindById, createGuildConfig } = await import("#services");
		
		const guildId = this.guild.id

		const guildConfig = await guildConfigFindById(guildId)
		if(!guildConfig.success) await createGuildConfig(guildId)
			
		const guildData = guildConfig.data

		const choice = choose ? choose : guildData.punishmentType
		
		switch(choice){
			
			case penalties.noChoice:
				
			return false
			
			case penalties.ban:
				await this.ban(userId, reason)
			return
			
			case penalties.kick:
				await this.kick(userId, reason)
			return
			
			case penalties.jail:
				await this.jail(userId)
			return
			
			case penalties.removeRoles:
				await this.deleteUserRoles(userId)
			return
			
			case penalties.removeAuthorities:
				await this.deleteAuthorityRoles(userId, permissions)
			return
			
			case penalties.removeAuthoritiesAndRolesGiveJail:
				await this.jail(userId)
				await this.deleteUserRoles(userId)
				await this.deleteAuthorityRoles(userId, permissions)
			return
			
			default: 
				console.warn("[punishManager / execute]: Penalties is undefined")
			return null
		}
	}
}