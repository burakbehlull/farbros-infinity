import { EmbedBuilder } from 'discord.js';
import { themes, colors } from '#data'

class Sender {
	constructor(client){
		this.client = client
	}
	
	async getChannelHybrid(channelId, interaction){
		try {
			
			const source = interaction ? interaction : this.client
			const client = 
				source?.client ??
				source?.user?.client ??
				source;

			if (!client || !client.channels) {
				console.error("[Sender/getChannel]: Invalid source or client not found");
				return null;
			}

			let channel = client.channels.cache.get(channelId);

			if (!channel) {
				channel = await client.channels.fetch(channelId);
			}

			return channel;
		} catch (err) {
			console.error(`[Sender/getChannel]: Cannot fetch channel (${channelId})`, err);
			return null;
		}

	}
	
	async getUserHybrid(userId, interaction) {
		try {
			const source = interaction ? interaction : this.client
			const client =
				source?.client ??
				source?.user?.client ??
				source;

			if (!client || !client.users) {
				console.error("[Sender/getUser]: Invalid source or client not found");
				return null;
			}

			let user = client.users.cache.get(userId);

			if (!user) {
				user = await client.users.fetch(userId);
			}

			return user;
		} catch (err) {
			console.error(`[Sender/getUser]: Cannot fetch user (${userId})`, err);
			return null;
		}
	}
	
	async getUser(userId) {
		const guild = this.client.guild
		if (!userId) {
			console.error("[Sender/getMember]: Missing userId or guild");
			return null;
		}

		try {
			let member = guild.members.cache.get(userId);
			if (!member) {
				member = await guild.members.fetch(userId);
			}
			return member;
		} catch (err) {
			console.error(`[Sender/getUser]: Cannot fetch member (${userId})`, err);
			return null;
		}
	}
	
	async getChannel(channelId) {
		const guild = this.client.guild
		
		if (!channelId) {
			console.error("[Sender/getGuildChannel]: Missing channelId or guild");
			return null;
		}
		

		try {
			let channel = guild.channels.cache.get(channelId);
			if (!channel) {
				channel = await guild.channels.fetch(channelId);
			}

			if (channel.guild.id !== guild.id) {
				console.warn(`[Sender/getGuildChannel]: Channel (${channelId}) does not belong to this guild`);
				return null;
			}

			return channel;
		} catch (err) {
			console.error(`[Sender/getGuildChannel]: Error while checking channel (${channelId})`, err);
			return null;
		}
	}

	async send({id, reply, text, embed, embeds, components, ephemeral}={}){
		
		const content = {};
		
        if (text) content.content = text;
		if (embeds || embed) content.embeds = embeds ? embeds : [embed];
        if (components) content.components = components;
        if (ephemeral) content.ephemeral = ephemeral;
		
		let channel;
		
		if(reply){
			this.client.reply(content)
		} else if(id){
			channel = await this.getChannel(id)
			channel.send(content)
		} else {
			channel = this.client.channel
			channel.send(content)
		}
		
	}
}

class ThemeBuilder extends Sender {
	constructor(client){
		super(client)
	}
	randomColor(){
		return Math.floor(Math.random() * (0xffffff + 1))
	}
	
	getNameAndAvatars(type, action){
		const interaction = action || this.client
		const user = interaction.author ?? interaction.user

		if(type=="user") {
			return {
				text: user.username,
				name: user.username,
				iconURL: user.displayAvatarURL()
			}
		} else if(type=="guild") {
			return {
				text: interaction.guild.name, 
				name: interaction.guild.name, 
				iconURL: interaction.guild.iconURL()
			}
		}
	}
	
	createTheme({ heritage, title, description, image, thumbnail, fields=[], 
		author, color=0x0099FF, footer, timestamp=false, timestampContent=false}){
		
		const IEmbed = new EmbedBuilder(heritage ?? {})
		
		if (color) IEmbed.setColor(color)
		if (title) IEmbed.setTitle(title)
		if (footer) IEmbed.setFooter(footer)
		if (author) IEmbed.setAuthor(author)
		if (description) IEmbed.setDescription(description)
		if (image) IEmbed.setImage(image);
		if (thumbnail) IEmbed.setThumbnail(thumbnail);
		if (fields.length) IEmbed.addFields(...fields);
		if (timestamp) IEmbed.setTimestamp()
		if (timestampContent) IEmbed.setTimestamp(timestampContent)
		
		return IEmbed
	}
	
	async embedThemeBuilder(type, {
		heritage=null,
		action=false,
		randomColor=false,
		
		author=null,
		description=null,
		title=null,
		footer=null,
		
		color=null,
		thumbnail=null,
		image=null,
		fields=[],
		
	}={}){
		const { guildConfigFindById } = await import("#services");
		
		const init = action ? (theme) => ({
			embed: theme,
			reply: (options = {}) => {
				const { ephemeral = false, components = null } = options;
				return this.send({ embed: theme, reply: true, components, ephemeral });
			},
			send: (options = {}) => {
				const { id = null, components = null } = options;
				return this.send({ id, embed: theme, components });
			},
			log: async () => {
				
				const guildId = this.client.guild.id
				const guildConfig = await guildConfigFindById(guildId)
				const logChannelId = guildConfig.data.logChannelId
				
				if(!logChannelId) {
					console.warn("Log Channel Id is not found")
					return
				}
				
				return this.send({ id: logChannelId, embed: theme });
			}
		}) : (theme)=> theme

		let theme;
		
		const rc = randomColor ? this.randomColor() : color
		
		switch(type){
			case themes.success:
				theme = this.createTheme({
					heritage,
					
					author, title, description, fields, footer,
					image, thumbnail,
					
					color: rc || colors.green,
					timestamp: true
			})
				
			return init(theme)
			
			case themes.error:
				theme = this.createTheme({
					heritage,
					
					author, title, description, 
					fields, image, thumbnail,
					footer: footer || this.getNameAndAvatars("user"),

					
					color: rc || colors.red,
					timestamp: true
			})
				
			return init(theme)
			
			case themes.classic:
				theme = this.createTheme({
					heritage,
					
					author: author || this.getNameAndAvatars("guild"),
					
					title, description, fields, 
					image, thumbnail,
					
					footer: footer || this.getNameAndAvatars("user"),

					
					color: rc || colors.lightBlue3,
					timestamp: true
			})
				
			return init(theme)
			
			
			case themes.rich:
				theme = this.createTheme({
					heritage,
					author: author || this.getNameAndAvatars("guild"),
					
					title, description, fields,
					image, thumbnail,
					
					color: rc,
					footer: footer || this.getNameAndAvatars("user"),
					timestamp: true,
				})
			return init(theme)
			
			case themes.warn:
				theme = this.createTheme({
					heritage,
					author: author || this.getNameAndAvatars("guild"),
					
					title, description, fields,
					image, thumbnail,
					
					color: rc || colors.gold2,
					footer: footer || this.getNameAndAvatars("user"),
					timestamp: true,
				})
			return init(theme)
				
		}
	}
	
}

export default ThemeBuilder