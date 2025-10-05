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

export {
	itentsMiddle,
	itentsAll
}
