import { AuthorityManager } from "#managers";

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
        const AM = new AuthorityManager(client);
        await AM.info(role.guild, AM.audit.RoleDelete);
        
        console.log(`[Role deleted]: ${role.id}`);
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
