const { Events, ActivityType } = require('discord.js')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client, ActivityType) {
		console.log(`${client.user.tag} adlı bot hazır!`);
        client.user.setPresence({
			activities: [
				{
					name: `Merhaba!`,
					type: ActivityType.Listening
				}
			],
			status: "idle",
			shardId: 0
		})

	},
}