const { SlashCommandBuilder } = require('discord.js')
const RoleBackup = require('../models/RoleBackup')
const { PermissionsManager } = require('../managers/index')
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
            const IsAuthority = await PM.isAuthority(PM.flags.Administrator)
            
            if(PM.config.isRoles && !IsRoles || PM.config.isOwner && !IsOwners || PM.config.isAuthority && !IsAuthority) return await interaction.reply("Yetersiz yetki!")
            

            const roles = interaction.guild.roles.cache
        
            for (const [roleId, role] of roles) {
                if (role.managed) continue;

                const members = role.members.map(member => ({
                    userId: member.user.id,
                    username: member.user.tag
                }))

                const existingBackup = await RoleBackup.findOne({ roleId, guildId: interaction.guild.id })

                if (existingBackup) {
                    existingBackup.members = members;
                    existingBackup.roleName = role.name;
                    existingBackup.roleColor = role.hexColor;
                    existingBackup.backedUpAt = new Date();
                    await existingBackup.save();
                } else {
                    const newBackup = new RoleBackup({
                        roleId,
                        roleName: role.name,
                        roleColor: role.hexColor,
                        members,
                        guildId: interaction.guild.id
                    });
                    await newBackup.save()
                }
            }

            await interaction.editReply({
                content: 'Tüm roller ve üyeler başarıyla yedeklendi!',
            })
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                content: 'Roller yedeklenirken bir hata oluştu.',
            })
        }
    },
}
