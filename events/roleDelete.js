const { Events } = require("discord.js")
const { MessageSender } = require("../helpers/index")
const { PermissionsManager } = require("../managers/index")
const RoleBackup = require("../models/RoleBackup")


module.exports = {
	name: Events.GuildRoleDelete,
	async execute(role, client) {
        const sender = new MessageSender(client)
        const PM = new PermissionsManager(role)
        try {
            if(!PM.config.isRoleDelete) return

            const user = await sender.info(role, sender.audit.RoleDelete) 

            const owner = await PM.isOwners(user.executorId)
            const roles = await PM.isRoles(user.executorId)
            const authority = await PM.isAuthority(user.executorId, [PM.flags.Administrator])
            
            const member = await sender.getUser(user.executorId, role)

            if(!user || !member) return;
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            
            
            await member.ban({
                reason: 'Role silerken banlandı'
            }).then(async ()=>{
                console.log('Kullanıcı banlandı.')
                await sender.send({
                    interaction: role,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Role Log',
                    description: `<@${user.executorId}>, **${role.name}** adlı rolü sildiği için banlandı.`,
                },PM.config.LogChannel)
            }).catch((err)=> console.log(err.message))
            
            const roleBackup = await RoleBackup.findOne({ roleId: role.id, guildId: role.guild.id })
            if (!roleBackup) {
                console.log('Bu rol için yedek bulunamadı.')
                return
            }

            const newRole = await role.guild.roles.create({
                name: roleBackup.roleName,
                color: roleBackup.roleColor,
                permissions: roleBackup.permissions || [],
                reason: 'Silinen rol geri yüklendi.'
            })
            console.log(`Rol geri yüklendi: ${newRole.name}`)

            const membersToRestore = roleBackup.members

            for (const memberData of membersToRestore) {
                const member = await role.guild.members.fetch(memberData.userId).catch(() => null)
                if (member) {
                    await member.roles.add(newRole).catch(err => console.log(`Rol verilirken hata: ${err.message}`))
                }
            }

            console.log('Üyelere rol başarıyla geri verildi.')

            return;
        } catch (err) {
            console.log("Hata: ", err.message)
        }
    },
}