import { getPrefixCommands, getSlashCommands, getEvents, 
	deploySlashCommands, eventExecuter, commandExecuter } from '#helpers'

class Base {
    constructor(client, token, botId){
		this.client = client
		this.token = token
		this.botId = botId
	}
	
	async loaders() {
	  const client = this.client;
	  
	  const prefixCommands = await getPrefixCommands()
	  const slashCommands = await getSlashCommands()
	  const events = await getEvents()
	 
	  await commandExecuter(client, slashCommands, prefixCommands)
	  await deploySlashCommands(this.token, this.botId, slashCommands)
	  
	  await eventExecuter(client, events) 
	  
	}
	

	connect(){
		this.client.login(this.token);
	}
}

export default Base