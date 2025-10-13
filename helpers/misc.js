import { GatewayIntentBits } from 'discord.js';

function itentsMiddle(){
	return [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	]
}

function itentsAll(){
    return Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
}

function controlLevel(data, type, selectedLevels = []) {
  if (!data) return [];

  let allItems = [];

  for (const level of selectedLevels) {
    const config = data[level];
    if (!config) continue;

    if (!config.enable) continue;

    if (type === "authorities" && !config.isAuthorities) continue;

    if (Array.isArray(config[type])) {
      allItems = allItems.concat(config[type]);
    }
  }

  allItems = [...new Set(allItems)];

  return allItems;
}



export {
	itentsMiddle,
	itentsAll,
	controlLevel
}
