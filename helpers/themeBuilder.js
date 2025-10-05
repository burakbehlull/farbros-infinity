import { EmbedBuilder } from 'discord.js';

class Sender {
	constructor(client){
		this.client = client
	}
	getChannel(id){
		if(!id) {
			console.error("[Sender/getChannel]: Channel Id is not found")
			return null
		}
		try {
			let channel = this.client.channels.cache.get(id);
			if (!channel) {
				channel = await this.client.channels.fetch(id);
			}
			return channel;
		} catch (err) {
			console.error(`[Sender/getChannel]: Cannot fetch channel (${id})`, err);
			return null;
		}

	}
	
	createTheme({ heritage, title, description, image, thumbnail, fields=[], 
		author, color=0x0099FF, footer, timestamp}){
		
		const IEmbed = new EmbedBuilder(heritage)
		
		if (color) IEmbed.setColor(color)
		if (title) IEmbed.setTitle(title)
		if (timestamp) IEmbed.setTimestamp(timestamp)
		if (footer) IEmbed.setFooter(footer)
		if (author) IEmbed.setAuthor(author)
		if (description) IEmbed.setDescription(description)
		if (image) IEmbed.setImage(image);
		if (thumbnail) IEmbed.setThumbnail(thumbnail);
		if (fields.length) IEmbed.addFields(...fields);
		
		return IEmbed
	}
	
	getNameAndAvatars(type){
		const interaction = this.client
		const user = interaction.author ?? interaction.user

		if(type=="user") {
			return {
				text: user.username,
				iconURL: user.displayAvatarURL()
			}
		} else if(type=="guild") {
			return {
				name: interaction.guild.name, 
				iconURL: interaction.guild.iconURL()
			}
		}
	}
	
	embedThemeBuilder(type, {
		randomColor=false
		description
		title=null
		footer=null
	}={}){
		
		
		let theme;
		switch(type){
			case themes.success:
				theme = this.createTheme({
					title,
					description,
					color: colors.green
				})
			return theme
			
			case themes.error:
				theme = this.createTheme({
					title, 
					description,
					color: colors.red,
				})
			return theme
				
		}
	}
}

class ThemeBuilder extends Sender {
	constructor(client){
		super(client)
	}
}

export default ThemeBuilder