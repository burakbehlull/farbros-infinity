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
    async isRoles(userId, firstOnce){
        if(!userId) return
        let member;
        if(firstOnce){
            member = this.interaction.members.cache.get(userId)
        } else {
            member = this.interaction.guild.members.cache.get(userId)
        }
        const { isRoles, roles } = this.config
        if(isRoles){
			let statusPromises = roles.map(async (role) => {
				let hasRole = await member.roles.cache.has(role)
				return hasRole
			})

			let status = await Promise.all(statusPromises)

			let hasRoleStatus = status.includes(true)

			return hasRoleStatus
        }

    }
    async isAuthority(userId, authorities, firstOnce){
        if(this.config.isAuthority && authorities){
            
            let member;
            
            if(firstOnce){
                member = this.interaction.members.cache.get(userId)
            } else {
                member = this.interaction.guild.members.cache.get(userId)
            }

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

    async selectOwnerIds(status, key, userId){
        const getConfig = this.config[key]
        if(!getConfig || !key) {
            console.log(key+' geçersiz key')
            return;
        }

        if(status && getConfig && userId){
            return getConfig.includes(userId)
        }
    }

    async selectRolesId(status, key, userId, firstOnce){

        let member;
        if(firstOnce){
            member = this.interaction.members.cache.get(userId)
        } else {
            member = this.interaction.guild.members.cache.get(userId)
        }

        const getConfig = this.config[key]

        if(!getConfig || !key) {
            console.log(key+' geçersiz key')
            return;
        }

        if(status && getConfig){
			let statusPromises = getConfig.map(async (role) => {
				let hasRole = await member.roles.cache.has(role)
				return hasRole
			})

			let statusAll = await Promise.all(statusPromises)

			let hasRoleStatus = statusAll.includes(true)

			return hasRoleStatus
        }
    }
    
}
module.exports = {
    PermissionsManager
}
