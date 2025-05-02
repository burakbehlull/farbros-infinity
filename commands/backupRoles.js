const { SlashCommandBuilder } = require('discord.js')
const { PermissionsManager } = require('../managers/index')
const Backup = require('../libs/Backup')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('backuproles')
        .setDescription('Sunucudaki tüm rolleri ve o rollere sahip üyeleri yedekler.'),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true })
        
        try {
            
            const userId = interaction.user.id

            const PM = new PermissionsManager(interaction)
            const IsRoles = await PM.isRoles()
            const IsOwners = await PM.isOwners(userId)
            const IsAuthority = await PM.isAuthority(userId, [PM.flags.Administrator])
            
            if(PM.config.isRoles && !IsRoles || PM.config.isOwner && !IsOwners || PM.config.isAuthority && !IsAuthority) return await interaction.reply("Yetersiz yetki!")
        
            const backup = new Backup(interaction)
            await backup.roles()

            await interaction.editReply({
                content: 'Tüm roller ve üyeler başarıyla yedeklendi!',
            })
        } catch (error) {
            console.error(error)
            await interaction.editReply({
                content: 'Roller yedeklenirken bir hata oluştu.',
            })
        }
    },
}
