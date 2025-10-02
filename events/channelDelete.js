import { AuthorityManager } from '#managers'

export default {
  name: "channelDelete", 
  async execute(client, channel) {
    try {
        const authorityManager = new AuthorityManager(client);
        await authorityManager.info(channel.guild, authorityManager.audit.ChannelDelete);
        console.log(`[Channel deleted]: ${channel.id}`);
    } catch (error) {
        console.error('Error handling channel deletion:', error);
    }
  },
};
