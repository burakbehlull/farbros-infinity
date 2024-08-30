const config = require('../config.json')

class PermissionsManager {

    constructor(interaction){
        this.interaction = interaction
        this.config = config
    }

    isOwners(userId){
        if(!userId) return
        const { isOwner, owners } = this.config
        if(isOwner) {
            return owners.includes(userId)
        }
    }
    async isRoles(userId){
        const member = this.interaction.guild.members.cache.get(userId)
        const { isRoles, roles } = this.config
        if(isRoles){
			let statusPromises = roles.map(async (role) => {
				let hasRole = await member.roles.cache.has(role)
                console.log(hasRole)
				return hasRole
			})

			let status = await Promise.all(statusPromises)

			let hasRoleStatus = status.includes(true)

			return hasRoleStatus
        }

    }
}
module.exports = {
    PermissionsManager
}
