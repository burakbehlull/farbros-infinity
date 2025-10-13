import Manager from "#managers";

import { themes } from '#data'

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
		
        const { authority, theme: tb, audit } = new Manager(client, {
			action: role
		});
		
		const control = await authority.control({
			audit: audit.RoleDelete, 
			levels: ["high", "mid"]
		})
		
		const user = await tb.getUser(control.userId)
		
		const theme = tb.embedThemeBuilder(themes.success, {
			  action: true,
			  author: tb.getNameAndAvatars("guild"),
			  description: "başarılı",
			  footer: tb.getNameAndAvatars("user", user)
		})
		
		theme.send({id: "948696953695383643"})
	
		if(!control.status) console.log("yetersiz yetki")
			
	} catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
