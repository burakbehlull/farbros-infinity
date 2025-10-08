import Manager from "#managers";

export default {
  name: "roleDelete", 
  async execute(client, role) {
    try {
        const manager = new Manager(client, {
			authority: {
				action: role.guild
			}
		});
        const info = await manager.authority.info(manager.audit.RoleDelete);
        const x = await manager.authority.isAuthorities(info.executorId,  ["BanMembers", "ManageRoles"])
        // console.log(`[Role deleted]: ${role.id}`);
        console.log(`[IA]`, x);
    } catch (error) {
        console.error('Error handling role deletion:', error);
    }
  },
};
