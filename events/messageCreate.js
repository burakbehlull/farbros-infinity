const { Events, PermissionsBitField } = require('discord.js');
const { PermissionsManager } = require("../managers/index")

const adKeywords = ['discord.gg', 'http://', 'https://', '.com', '.net', 'invite.gg'];

const userWarnings = new Map();

module.exports = {
  name: Events.MessageCreate,

  async execute(message) {
	const PM = new PermissionsManager(message)
	if(!PM.config.isChatGuard) return
	
    if (message.author.bot || !message.guild) return;

    const hasAd = adKeywords.some(keyword =>
      message.content.toLowerCase().includes(keyword)
    );
    if (!hasAd) return;

    const userId = message.author.id;
    const guildId = message.guild.id;
    const key = `${guildId}-${userId}`;
	
	const owner = await PM.isOwners(userId)
    const roles = await PM.isRoles(userId)
    const authority = await PM.isAuthority(userId, [PM.flags.Administrator])
	if(owner && PM.config.isOwner || roles && PM.config.isRoles || authority && PM.config.isAuthority) return;
            
    const currentWarnings = userWarnings.get(key) || 0;
    const newWarnings = currentWarnings + 1;
    userWarnings.set(key, newWarnings);

    try {
      await message.delete();
    } catch (err) {
      console.error('Mesaj silinemedi:', err);
    }

    await message.channel.send({
      content: `<@${userId}>, reklam yapmak yasaktır! **(${newWarnings}/3** uyarı)`
    });

    if (newWarnings >= 3) {
      try {
        await message.guild.members.ban(userId, {
          reason: 'Reklam yapma (ChatGuard)',
        });
        await message.channel.send({
          content: `<@${userId}> sunucudan banlandı. (3/3)`,
        });
        userWarnings.delete(key);
      } catch (err) {
        console.error('Ban atılamadı:', err);
      }
    }
  },
};
