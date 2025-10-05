import { themeBuilder } from '#libs'
import { themes } from '#data'

export default {
  name: 'ping',
  description: 'Example command, ping.',
  async execute(client, message, args) {
    try {	  
	  const theme = new themeBuilder(message)


	  const ITheme = theme.embedThemeBuilder(themes.success, {
		  action: true,
		  author: theme.getNameAndAvatars("guild"),
		  description: "başarılı",
		  footer: theme.getNameAndAvatars("user")
	  })
	  
	  ITheme.reply()
	  // theme.send({embed: ITheme, id: "948696953695383643"})
      // message.reply({embeds: [ITheme] })
    } catch (err) {
      console.error('error: ', err);
    }
  },
};
