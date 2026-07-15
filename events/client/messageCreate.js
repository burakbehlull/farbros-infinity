import { Events } from 'discord.js';

export default {
  name: Events.MessageCreate, 
  panelName: "messageCommandExecuter",
  async execute(client, message) {
	
	if(message.author.bot) return;
	if(!message.guild) return;
	
	const { guildConfigFindById } = await import("#services");
			
	const guildId = message.guild.id
	const guildConfig = await guildConfigFindById(guildId)
	
	// Check if message command executer is enabled
	if(!guildConfig?.success || !guildConfig?.data) return;
	
	const config = guildConfig.data;
	
	// Check if the guard is enabled
	if(!config.messageCommandExecuter) return;
	
    const prefix = config.prefix || "."
	
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
