
export default class AuthorityManager {
    constructor(client, options) {
        this.client = client;
		this.options = options
    }
    async info(type){
        const log = await this.options.action.fetchAuditLogs({limit:1,type: type})
        const entry = log.entries.first();
        
        return entry
    }
	
    async isAuthorities(userId, authorities){
		const action = this.options.action
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
		
		const action = this.options.action
        const member = action.members.cache.get(userId)
        
		const statusPromises = await roles.map(async (role) => {
			const hasRole = await member.roles.cache.has(role)
			return hasRole
		})

		const status = await Promise.all(statusPromises)
		
		const hasRoleStatus = status.includes(true)

		return hasRoleStatus
        

    }
}