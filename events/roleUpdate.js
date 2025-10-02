import { AuthorityManager } from "#managers";

export default {
  name: "roleUpdate", 
  async execute(client, oldRole, newRole) {
    try {
        const AM = new AuthorityManager(client);
        await AM.info(oldRole.guild, AM.audit.RoleUpdate);

        console.log(`[Role update old]: ${oldRole?.id}`);
        console.log(`[Role update new]: ${newRole?.id}`);
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
