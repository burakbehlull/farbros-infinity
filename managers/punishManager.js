
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
}