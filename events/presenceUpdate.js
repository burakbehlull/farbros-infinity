const { Events } = require('discord.js')
const { PunishManager, PermissionsManager } = require('../managers/index')
const { MessageSender } = require('../helpers/index')

module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence) {
        try {
            const PM = new PermissionsManager(oldPresence)
            const PUM = new PunishManager(oldPresence)
            const sender = new MessageSender(oldPresence)

            if(!PM.config.isWebEntry) return;
            
            const userId = oldPresence.userId

            const owner = await PM.isOwners(userId)
            const roles = await PM.isRoles(userId)
            const authority = await PM.isAuthority(userId, [PM.flags.Administrator])
            if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;

            const user = await sender.getUser(userId)
            
            const platforms = newPresence.clientStatus

            // desktop, mobile
            if(platforms.web){
                console.log(`${newPresence.user.tag}, adlı kullanıcı webten giriş yaptı!`)
                const flags = PUM.flags
                await PUM.deleteAuthorityRoles(user.id, [flags.Administrator, flags.ManageRoles, flags.ManageGuild, 
                    flags.ManageChannels, flags.KickMembers, flags.BanMembers])
                await sender.send({
                    interaction: oldMember,
                    isEmbed: true,
                    templateEmbed: true,
                    title: 'Guild Log',
                    description: `<@${userId}>, webten girdiği için yetkileri alındı.`,
                },PM.config.LogChannel)
            }
        } catch (error) {
            console.log('Hata: ', error.message)
        }
	},
};
