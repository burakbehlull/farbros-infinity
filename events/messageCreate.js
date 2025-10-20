import { Events } from 'discord.js';

export default {
  name: Events.MessageCreate, 
  panelName: "messageCommandExecuter",
  async execute(client, message) {
	
	const { guildConfigFindById } = await import("#services");
			
	const guildId = message.guild.id
	const guildConfig = await guildConfigFindById(guildId)
	
    const prefix = guildConfig?.data?.get("prefix") || "."
	
	if(message.author.bot) return

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
      await command(client, message, args);
    } catch (error) {
      console.error(`❌ Error executing command: ${commandName}`, error);
      message.channel.send('❌ There was an error executing that command.');
    }
  },
};
