const { REST, Routes } = require('discord.js');
require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

for (const commandFile of commandFiles) {
	const command = require(path.join(foldersPath, commandFile));
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[HATA]: ${commandFile} data ve ya execute eksik`);
	}
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`(/) ${commands.length} tane komut yenileniyor.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.BOT_ID),
			{ body: commands },
		);

		console.log(`(/) Başarıyla ${data.length} komut yüklendi. `);
	} catch (error) {
		console.error(error);
	}
})();