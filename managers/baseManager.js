import { AuthorityManager, punishManager } from '#managers'
import { AuditLogEvent } from "discord.js"

class Manager {
    constructor(client, options = { action: null, authority: {}, punish: {} }) {
        this.authority = new AuthorityManager(client, action, options.authority);
        this.punish = new punishManager(client, action, options.punish);
		this.audit = AuditLogEvent
    }
}


export default Manager
