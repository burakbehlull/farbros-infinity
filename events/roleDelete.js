import Manager from "#managers";

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
		
        const { authority, audit } = new Manager(client, {
			action: role
		});
		
		const control = await authority.control({
			audit: audit.RoleDelete, 
			levels: ["high", "mid"]
		})
		
		if(!control) console.log("yetersiz yetki")
			
	} catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
