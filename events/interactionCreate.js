const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Komut bulunamadı: ${interaction.commandName}`);
			return;
		}

		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(`[InteractionCreate] Hata: ${interaction.commandName}`)
			console.error(error);
		}
	},
};