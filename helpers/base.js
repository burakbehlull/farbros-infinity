const { ActivityType, Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

class Base {
    constructor(client){
        this.client = client
    }
    loadCommands(){
        try {
            this.client.commands = new Collection()

            const commandsPath = path.join(__dirname, '..', 'commands')
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
            
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    this.client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }

            const commandSize = this.client.commands.size
            console.log(`${commandSize} tane komut başarıyla yüklendi.`)
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    }
    loadEvents(){
        try {
            const eventsPath = path.join(__dirname, '..', 'events')
            const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))
            
            for (const file of eventFiles) {
                const filePath = path.join(eventsPath, file)
                const event = require(filePath)
                if (event.once) {
                    this.client.once(event.name, (...args) => event.execute(...args, ActivityType))
                } else {
                    this.client.on(event.name, (...args) => event.execute(...args, this.client))
                }
            }
            console.log(`${eventFiles.length} tane event dosyası yüklendi.`)
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    }
    login(){
        this.client.login(process.env.TOKEN)
    }
}

module.exports = Base