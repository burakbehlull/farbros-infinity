const { Events } = require("discord.js")
const { MessageSender } = require('../helpers/messageSender')
const { PermissionsManager, PunishManager } = require('../managers/index')

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(oldMember, newMember, client) {
        try {
            
            const PM = new PermissionsManager(newMember)
            const sender = new MessageSender(newMember)
            const PUM = new PunishManager(newMember)

            if(!PM.config.isRoleAuthorityProtection) return
            
            const user = await sender.info(oldMember, sender.audit.MemberRoleUpdate)

            const givingUser = user.executor.id
            const targetUser = user.target.id
            const bot = user.executor.bot
            
            if(bot || givingUser===targetUser) return;

            const owner = await PM.isOwners(givingUser)
            const roles = await PM.isRoles(givingUser)
            const authority = await PM.isAuthority(givingUser, [PM.flags.Administrator])
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
            const oldRoles = oldMember.roles.cache
            const newRoles = newMember.roles.cache

            const addedRoles = newRoles.filter(role => !oldRoles.has(role.id))
            if (addedRoles.size > 0) {
                addedRoles.forEach(async (role) => {
                    
                    const flags = PM.flags
                    console.log(`${newMember.user.tag} kullanıcısına ${role.name} rolü verildi.`)

                    const permissons = [flags.Administrator, flags.ManageRoles, flags.ManageGuild, 
                        flags.ManageChannels, flags.KickMembers, flags.BanMembers]
                        
                    const IsAuthority = await PM.isRolesAuthority(role.id,[PM.flags.Administrator])
                        if(IsAuthority){
                        await PUM.deleteAuthorityRoles(givingUser, permissons)
                        await PUM.deleteAuthorityRoles(targetUser, permissons)

                        await sender.send({
                            interaction: oldMember,
                            isEmbed: true,
                            templateEmbed: true,
                            title: 'User Log',
                            description: `<@${givingUser}>, <@${targetUser}> üstüne yetki verdiği için, tüm yetki rolleri çekildi..`,
                        },PM.config.LogChannel)
                    }
                })
            }

            /*
            const removedRoles = oldRoles.filter(role => !newRoles.has(role.id))
            if (removedRoles.size > 0) {
                removedRoles.forEach(role => {
                    console.log(`${newMember.user.tag} kullanıcısından ${role.name} rolü alındı.`)
                })
            }
            */
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    },
}