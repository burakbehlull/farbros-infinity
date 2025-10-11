import { themeBuilder } from '#libs'
import { themes } from '#data'

export default {
  name: 'ping',
  description: 'Example command, ping.',
  async execute(client, message, args) {
    try {	  
	  const tb = new themeBuilder(message)

	  const theme = tb.embedThemeBuilder(themes.success, {
		  action: false,
		  author: tb.getNameAndAvatars("guild"),
		  description: "başarılı",
		  footer: tb.getNameAndAvatars("user")
	  })
	  
	  // theme.reply()
	  tb.send({embed: theme, id: "948696953695383643"})
      // message.reply({embeds: [theme] })
    } catch (err) {
      console.error('error: ', err);
    }
  },
};
