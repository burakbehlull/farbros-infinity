import Manager from "#managers";
import { themes, penalties } from "#data";

export default {
	name: "guildMemberUpdate",
	async execute(client, oldMember, newMember) {
		try {
			
		  const { authority, theme: tb, audit, punish, flags } = new Manager(client, {
			action: oldMember,
		  })

		  const isEnable = await authority.isEnable("memberRoleGuard")
		  if (!isEnable) return

		  const control = await authority.control({
			audit: audit.MemberRoleUpdate,
			levels: ["mid"],
		  });
		  
		  if (control.status) return;

		  const userId = control.userId

		  const oldRoles = oldMember.roles.cache
		  const newRoles = newMember.roles.cache

		  const addedRoles = newRoles.filter((r) => !oldRoles.has(r.id))
		  const removedRoles = oldRoles.filter((r) => !newRoles.has(r.id))

		  if (addedRoles.size > 0 || removedRoles.size > 0) {
			await newMember.roles.set([...oldRoles.keys()]).catch(() => {})
		  }

		  const punishment = await punish.execute(userId, {
			choose: penalties.removeAuthorities,
			permissions: [flags.Administrator, flags.ManageRoles, flags.ManageGuild, 
				flags.ManageChannels, flags.KickMembers, flags.BanMembers]
		  })

		  const user = await tb.getUser(userId);
		  
		  const theme = await tb.embedThemeBuilder(themes.success, {
			action: true,
			title: "Authority Guard -> Member Update",
			author: tb.getNameAndAvatars("guild"),
			description: `${user} kullanıcısı, **${oldMember}** (${oldMember?.id}) adlı üyeyi güncelledi. Değişiklik geri alındı. ${punishment?.success ? punishment?.message : ""}`,
			footer: tb.getNameAndAvatars("user", user),
		  })

		  await theme.log()
	} catch (error) {
		console.error("Error handling member update:", error);
	  }
	},
}
