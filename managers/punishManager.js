const { PermissionsBitField } = require('discord.js')
const config = require('../config.json')

class PunishManager {
    constructor(interaction){
        this.interaction = interaction
        this.config = config
        this.flags = PermissionsBitField.Flags
    }

    async deleteAuthorityRoles(userId, permissionsArr) {
        const member = await this.interaction.guild.members.cache.get(userId)
        if (!member) {
            console.log('Kullanıcı bulunamadı!')
            return;
        }

        if(!permissionsArr){
            console.log('Yetkiler tanımlanmamış!')
            return
        }
    
        const rolesWithPermissions = []
    
        for (const role of member.roles.cache.values()) {
            const hasPermission = permissionsArr.every(permission => role.permissions.has(permission))
            
            if (hasPermission) {
                rolesWithPermissions.push(role)
            }
        }
    
        if (rolesWithPermissions.length === 0) return
    
        try {
            for (const role of rolesWithPermissions) {
                await member.roles.remove(role)
            }
            return true
        } catch (error) {
            console.error('Hata:', error)
        }
    }
    async deleteUserRoles(userId){
        
        try {
            const member = this.interaction.guild.members.cache.get(userId)
            if (!member) return

            const roles = member.roles.cache.filter(role => role.id !== interaction.guild.id)

            if (roles.size === 0) return

            for (const role of roles.values()) {
                await member.roles.remove(role);
            }  
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    }
    async jail(userId, jailRoleId){
        const jailRolesId = jailRoleId ?? this.config.jailRoleId
        try {
            const member = await this.interaction.guild.members.cache.get(userId)
            await member.roles.add(jailRolesId)
        } catch (error) {
            console.log('Hata: ', error.message)
        }

    }

    
}

module.exports = {
    PunishManager
}