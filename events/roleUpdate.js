import Manager from "#managers";

export default {
  name: "roleUpdate", 
  async execute(client, oldRole, newRole) {
    try {
        const manager = new Manager(client);
        await manager.authority.info(oldRole.guild, manager.audit.RoleUpdate);

        console.log(`[Role update old]: ${oldRole?.id}`);
        console.log(`[Role update new]: ${newRole?.id}`);
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
