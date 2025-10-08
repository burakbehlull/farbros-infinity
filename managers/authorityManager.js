
export default class AuthorityManager {
    constructor(client, options) {
        this.client = client;
		this.options = options
    }
    async info(type){
		
		// use: child.guild
        const log = await this.options.action.fetchAuditLogs({limit:1,type: type})
        const entry = log.entries.first();
        
        console.log("[x] ", entry)
        return entry
    }
	
    async isAuthorities(userId, authorities){
		const action = this.options.action
        let member = action.members.cache.get(userId)
			console.log("MEMBER", member.permissions.toArray());
		
        const result = authorities.map((authority)=> {
			console.log("authority ",authority)
            const isHasAuthority = member.permissions.has(authority)
			console.log("isHA", isHasAuthority)
            if(isHasAuthority){
                return true
            }
            return false
        })

		return result.includes(true) 
    }


}