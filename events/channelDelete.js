import Manager from "#managers";

export default {
  name: "channelDelete", 
  async execute(client, channel) {
    try {
        const manager = new Manager(client);
        await manager.authority.info(channel.guild, manager.audit.ChannelDelete);
		
		console.log(`[Channel deleted]: ${channel.id}`);
    } catch (error) {
        console.error('Error handling channel deletion:', error);
    }
  },
};
