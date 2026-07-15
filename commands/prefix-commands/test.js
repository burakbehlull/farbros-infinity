import { themeBuilder } from '#libs'
import { themes } from '#data'

export default {
  name: 'test',
  description: 'Test command for theme builder.',
  async execute(client, message, args) {
    try {	  
	  const tb = new themeBuilder(message)

	  const theme = await tb.embedThemeBuilder(themes.success, {
		  action: false,
		  author: tb.getNameAndAvatars("guild", message),
		  description: "Test komutu başarıyla çalıştı! ✅",
		  footer: tb.getNameAndAvatars("user", message)
	  })
	  
	  message.reply({embeds: [theme] })
    } catch (err) {
      console.error('Test command error: ', err);
	  message.reply('❌ Komut çalıştırılırken bir hata oluştu.');
    }
  },
};
