import { EmbedBuilder } from 'discord.js';

export default {
  name: 'ping',
  description: 'Example command, ping.',
  async execute(client, message, args) {
    try {	  
      message.reply("ping")
    } catch (err) {
      console.error('error: ', err);
    }
  },
};
