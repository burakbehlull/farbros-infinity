import { AuthorityManager } from '#managers'
import { AuditLogEvent } from "discord.js"

class Manager {
    constructor(client, options = { authority: {}, punish: {} }) {
        this.authority = new AuthorityManager(client, options.authority);
        // this.punish = new punishManager(client, options.punish);
		this.audit = AuditLogEvent
    }
}


export default Manager
