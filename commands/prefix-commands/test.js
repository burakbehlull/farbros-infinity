import { themeBuilder } from '#libs'
import { themes } from '#data'

export default {
  name: 'ping',
  description: 'Example command, ping.',
  async execute(client, message, args) {
    try {	  
	  const theme = new themeBuilder(message)
	  const x = await theme.getUser("677194506621288448")
	  console.log("[USER]", x)
	  const ITheme = theme.embedThemeBuilder(themes.success, {
		  author: theme.getNameAndAvatars("guild"),
		  description: "başarılı",
		  footer: theme.getNameAndAvatars("user")
	  })
	  
      message.reply({embeds: [ITheme] })
    } catch (err) {
      console.error('error: ', err);
    }
  },
};
