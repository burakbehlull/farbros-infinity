const { SlashCommandBuilder } = require('discord.js')
const { PermissionsManager } = require('../managers/index')
const Backup = require('../libs/Backup')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('backuproles')
        .setDescription('Sunucudaki tüm rolleri ve o rollere sahip üyeleri yedekler.'),
    async execute(interaction) {

        try {
            
            const userId = interaction.user.id

            const PM = new PermissionsManager(interaction)
            const IsRoles = await PM.isRoles(userId)
            const IsOwners = await PM.isOwners(userId)
            const IsAuthority = await PM.isAuthority(userId, [PM.flags.Administrator])

			let checks = []
			if(PM.config.isRoles) checks.push(IsRoles)
			if(PM.config.isOwner) checks.push(IsOwners)
			if(PM.config.isAuthority) checks.push(IsAuthority)
				
			const ctrl = checks.includes(true)
			if(!ctrl) return await interaction.reply("Yetersiz yetki!")

            const backup = new Backup(interaction)
            await backup.roles()

            await interaction.reply({
                content: 'Tüm roller ve üyeler başarıyla yedeklendi!',
            })
			
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'Roller yedeklenirken bir hata oluştu.',
            })
        }
    },
}
