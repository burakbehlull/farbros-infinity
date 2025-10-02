import Manager from "#managers";

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
        const manager = new Manager(client);
        await manager.authority.info(role.guild, manager.audit.RoleDelete);
        
        console.log(`[Role deleted]: ${role.id}`);
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
