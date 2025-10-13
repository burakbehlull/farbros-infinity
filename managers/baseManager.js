import { AuthorityManager, PunishManager } from '#managers'
import { themeBuilder } from '#libs'

import { AuditLogEvent } from "discord.js"

class Manager {
    constructor(client, options = { action: null, authority: {}, punish: {}, theme: {} }) {
        this.authority = new AuthorityManager(client, options.action, options.authority);
        this.punish = new PunishManager(client, options.action, options.punish);
		this.theme = new themeBuilder(options.theme?.action ? options.theme?.action : options.action )
		
		this.audit = AuditLogEvent
    }
}


export default Manager
