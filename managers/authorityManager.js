
export default class AuthorityManager {
    constructor(client, action, options) {
        this.client = client
		this.options = options
		this.action = action
		this.guild = action.guild
    }
	
    async info(type){
		const action = this.guild
        const log = await action.fetchAuditLogs({limit:1, type: type})
        const entry = log.entries.first();
        
        return entry
    }
	
    async isAuthorities(userId, authorities){
		const action = this.guild
        let member = action.members.cache.get(userId)
		
        const result = authorities.map((authority)=> {
            const isHasAuthority = member.permissions.has(authority)
            if(isHasAuthority){
                return true
            }
            return false
        })

		return result.includes(true) 
    }

    async isRoles(userId, roles){
		
		const action = this.guild
        const member = action.members.cache.get(userId)
        
		const statusPromises = await roles.map(async (role) => {
			const hasRole = await member.roles.cache.has(role)
			return hasRole
		})

		const status = await Promise.all(statusPromises)
		
		const hasRoleStatus = status.includes(true)

		return hasRoleStatus
        

    }

    isMembers(userId, members){    
		const result = members.includes(userId)
        return result
    }

	async isGuildOwner(userId) {
		const result = this.guild.ownerId === userId;
		return result
	}
	
	async selectGuildMember(userId, targetId) {
		const result = userId === targetId;
		return result
	}

}