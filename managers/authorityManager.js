import { AuditLogEvent } from "discord.js"

export default class AuthorityManager {
    constructor(client) {
        this.client = client;
        this.audit = AuditLogEvent
    }
    async info(child, type){
        const action = child ? child : this.client;

        const x = await action.fetchAuditLogs({limit:1,type: type})
        const entry = x.entries.first();
        
        console.log("[x] ", entry)
        return null;
    }
}