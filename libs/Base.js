import { getPrefixCommands, getSlashCommands, getEvents, eventExecuter, commandExecuter } from '#helpers'

class Base {
    constructor(client){
		this.client = client
	}
	
	async loaders() {
	  const client = this.client;
	  
	  const prefixCommands = await getPrefixCommands()
	  const slashCommands = await getSlashCommands()
	  const events = await getEvents()
	 
	  await commandExecuter(client, slashCommands, prefixCommands)
	  await eventExecuter(client, events) 
	}
	

	connect(){
		const client = this.client
		client.login(process.env.TOKEN);
	}
}

export default Base