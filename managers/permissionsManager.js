const { PermissionsBitField } = require('discord.js')
const config = require('../config.json')

class PermissionsManager {

    constructor(interaction){
        this.interaction = interaction
        this.config = config
        this.flags = PermissionsBitField.Flags
    }

    isOwners(userId){
        if(!userId) return
        const { isOwner, owners } = this.config
        if(isOwner) {
            return owners.includes(userId)
        }
    }
    async isRoles(userId){
        if(!userId) return
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
    async isAuthority(userId,...authorities){
        if(this.config.isAuthority && authorities){
            const member = this.interaction.guild.members.cache.get(userId)
            const result = authorities.map((authority)=> {
                const isHasAuthority =  member.permissions.has(authority)
                if(isHasAuthority){
                    return true
                }
                return false
            })

            return result.includes(true)

        }
    }
}
module.exports = {
    PermissionsManager
}
