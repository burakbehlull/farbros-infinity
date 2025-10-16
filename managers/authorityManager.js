import { controlLevel } from '#helpers'

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
	
	async selectGuildMember(userId, members=[]) {
		
		const result = members.includes(userId)
		return result
	}
	
	async control({audit, levels, users, newUserId}){
		
		const { guildConfigFindById, 
			createGuildConfig } = await import("#services");

		const info = audit ? await this.info(audit) : null

		const userId = audit ? info.executorId : newUserId
		
		const guildId = this.guild.id
		
		const guildConfig = await guildConfigFindById(guildId)
		
		if(!guildConfig.success) await createGuildConfig(guildId)
		
		const guildData = guildConfig.data
		
		const roles = controlLevel(guildData, "roles", levels)
		const authorities = controlLevel(guildData, "authorities", levels)
		const members = controlLevel(guildData, "members",levels)
		
		let checks = []
		
		const isRoles = await this.isRoles(userId, roles)
		const isAuthorities = await this.isAuthorities(userId, authorities)
		const isMembers = this.isMembers(userId, members)
		
		const owner = await this.isGuildOwner(userId)
		const selectedMembers = await this.selectGuildMember(userId, users)
		
		checks.push(isRoles)
		checks.push(isAuthorities)
		checks.push(isMembers)
		checks.push(owner)
		checks.push(selectedMembers)
		
		if (userId == process.env.BOT_ID) checks.push(true)

		const check = checks.includes(true)
		
		return { 
			userId: userId, 
			guildId: guildId,
			status: check,
		}
	}

}