import { Events, ActivityType } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} burada!`);

		client.user.setPresence({
			activities: [
				{
					name: 'Farbros Infinity V2',
					type: ActivityType.Watching
				}
			],
			status: "idle",
		});
		
	},
};
