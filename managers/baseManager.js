import { AuthorityManager, PunishManager } from '#managers'
import { AuditLogEvent } from "discord.js"

class Manager {
    constructor(client, options = { action: null, authority: {}, punish: {} }) {
        this.authority = new AuthorityManager(client, options.action, options.authority);
        this.punish = new PunishManager(client, options.action, options.punish);
		this.audit = AuditLogEvent
    }
}


export default Manager
