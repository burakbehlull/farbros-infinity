
export default class AuthorityManager {
    constructor(client, options) {
        this.client = client;
		this.options = options
    }
    async info(child, type){
		
        const log = await child.fetchAuditLogs({limit:1,type: type})
        const entry = log.entries.first();
        
        console.log("[x] ", entry)
        return entry
    }
}