const RoleBackup = require("../models/RoleBackup")
const { backup } = require('../config.json')
class Backup {
    constructor(interaction){
        this.interaction = interaction
    }

    async roles(){
        try {
            const guild = await this.interaction.client.guilds.fetch(this.interaction.guildId)
            const roles = await guild.roles.cache

            for (const [roleId, role] of roles) {
                if (role.managed) continue

                const members = role.members.map(member => ({
                    userId: member.user.id,
                    username: member.user.tag
                }))

                const existingBackup = await RoleBackup.findOne({ roleId, guildId: guild.id })

                if (existingBackup) {
                    existingBackup.members = members
                    existingBackup.roleName = role.name
                    existingBackup.roleColor = role.hexColor
                    existingBackup.backedUpAt = new Date()
                    await existingBackup.save()
                } else {
                    const newBackup = new RoleBackup({
                        roleId,
                        roleName: role.name,
                        roleColor: role.hexColor,
                        members,
                        guildId: guild.id
                    })
                    await newBackup.save()
                }
            }
            console.log('Yedek başarıyla alındı.')
        } catch(err){
            console.log('Hata: ', err.message)
        }
    }
}

module.exports = Backup