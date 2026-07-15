import { GuildConfig } from "#models"

async function getGuildConfig(values){
	const { guildId } = values.params
	let data;
	data = await GuildConfig.findOne({guildId})

	if(!data) {
		const created = await createGuildConfig(guildId)
		return {
			success: true,
			message: 'Böyle bir guild yok, yeni döküman oluşturuldu.',
			data: created.data.toJSON()
		}
	}

	return {
		code: 200,
		success: true,
		message: 'Döküman çekildi.',
		data: data.toJSON()
	}
}

async function createGuildConfig(guildId){
	const exist = await GuildConfig.findOne({guildId})
	if(exist) return {
		success: false,
		message: 'Aynı guild var!'
	}
	const guildConfig = await GuildConfig.create({guildId})
	
	return {
		code: 200,
		success: true,
		message: 'Döküman yaratıldı.',
		data: guildConfig.toJSON()
	}
	
}

async function guildConfigFindById(guildId){
	const data = await GuildConfig.findOne({guildId})
	if (!data) return {
		success: false,
		message: 'Böyle bir guild yok'	
	}
	return {
		success: true,
		code: 200,
		message: 'Döküman çekildi.',
		data: data.toJSON()
	}	
}

async function guildConfigUpdate(guildId, data){
	console.log("DEBUG guildConfigUpdate guildId: ", guildId);
	console.log("DEBUG guildConfigUpdate data: ", JSON.stringify(data, null, 2));
	let guildConfig = await GuildConfig.findOne({guildId})
	console.log("DEBUG guildConfigUpdate found guildConfig: ", guildConfig ? JSON.stringify(guildConfig.toJSON(), null, 2) : "not found");
	if(!guildConfig) {
		console.log("DEBUG guildConfigUpdate creating new guildConfig");
		guildConfig = await GuildConfig.create({ guildId })
	}
	
	// Explicitly set each top-level field (except _id, __v, guildId)
	if (typeof data.enable !== 'undefined') guildConfig.enable = data.enable;
	if (typeof data.prefix !== 'undefined') guildConfig.prefix = data.prefix;
	if (typeof data.logChannelId !== 'undefined') guildConfig.logChannelId = data.logChannelId; // Allow null
	if (typeof data.jailRoleId !== 'undefined') guildConfig.jailRoleId = data.jailRoleId; // Allow null
	if (typeof data.punishmentType !== 'undefined') guildConfig.punishmentType = data.punishmentType;
	if (typeof data.limit !== 'undefined') guildConfig.limit = Number(data.limit);
	
	// Guard settings
	const guardFields = [
		"roleDeleteGuard", "roleUpdateGuard", "channelDeleteGuard", 
		"channelUpdateGuard", "botAddGuard", "webGuard", "memberRoleGuard",
		"guildUrlGuard", "guildUpdateGuard", "kickGuard", "banGuard", 
		"kickBanLimitGuard", "messageCommandExecuter", "slashCommandExecuter"
	];
	
	guardFields.forEach(field => {
		if (typeof data[field] !== 'undefined') {
			guildConfig[field] = data[field];
		}
	});
	
	// Level settings (high, mid, low)
	const levelFields = ["high", "mid", "low"];
	levelFields.forEach(level => {
		if (data[level]) {
			const levelData = data[level];
			if (typeof levelData.enable !== 'undefined') guildConfig[level].enable = levelData.enable;
			if (typeof levelData.isAuthorities !== 'undefined') guildConfig[level].isAuthorities = levelData.isAuthorities;
			if (Array.isArray(levelData.authorities)) guildConfig[level].authorities = levelData.authorities;
			if (Array.isArray(levelData.members)) guildConfig[level].members = levelData.members;
			if (Array.isArray(levelData.roles)) guildConfig[level].roles = levelData.roles;
		}
	});

	console.log("DEBUG guildConfigUpdate saving guildConfig: ", JSON.stringify(guildConfig.toJSON(), null, 2));
	const result = await guildConfig.save();
	console.log("DEBUG guildConfigUpdate saved result: ", JSON.stringify(result.toJSON(), null, 2));
	
	return {
		success: true,
		message: 'Döküman güncellendi.',
		data: result.toJSON()
	};	
}

async function addItemToGuildConfig(guildId, {level, type, data}){
	
	let guildConfig = await GuildConfig.findOne({ guildId });
	if (!guildConfig) {
	  guildConfig = new GuildConfig({ guildId });
	}

	const mode = guildConfig[level]
	const result = mode[type]
	
	switch(type){
		case 'members':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu üye zaten var!'	
			}
			result.push(data)
			const savedMembers = await guildConfig.save()
			return {
				success: true,
				message: 'Üye eklendi.',
				data: savedMembers.toJSON()
			}
		case 'authorities':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu yetki zaten tanımlanmış!'	
			}
			result.push(data)
			const savedAuthorities = await guildConfig.save()
			return {
				success: true,
				message: 'Yetki eklendi.',
				data: savedAuthorities.toJSON()
			}
		case 'roles':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu rol zaten var!'	
			}
			result.push(data)
			const savedRoles = await guildConfig.save()
			return {
				success: true,
				message: 'Rol eklendi.',
				data: savedRoles.toJSON()
			}
		case 'enable':
			mode.enable = data
			const savedEnable = await guildConfig.save()
			return {
				success: true,
				message: 'Enable güncellendi',
				data: savedEnable.toJSON()
			}
		case 'isAuthorities':
			mode.isAuthorities = data
			const savedIsAuth = await guildConfig.save()
			return {
				success: true,
				message: 'Authority enable güncellendi',
				data: savedIsAuth.toJSON()
			}
		default:
			return {
				success: false,
				message: 'Geçersiz tür belirtildi.'
			}
	}
}

async function removeItemFromGuildConfig(guildId, { level, type, data }) {
  let guildConfig = await GuildConfig.findOne({ guildId });
  if (!guildConfig) {
    return {
      success: false,
      message: 'Bu sunucu için bir yapılandırma bulunamadı!'
    };
  }

  const mode = guildConfig[level];
  const result = mode[type];

  switch (type) {
    case 'members':
      if (!result.includes(data)) {
        return {
          success: false,
          message: 'Bu üye zaten listede değil!'
        };
      }
      mode.members = result.filter(item => item !== data);
      const savedRemoveMembers = await guildConfig.save();
      return {
        success: true,
        message: 'Üye kaldırıldı.',
		data: savedRemoveMembers.toJSON()
      };

    case 'authorities':
      if (!result.includes(data)) {
        return {
          success: false,
          message: 'Bu yetki zaten listede değil!'
        };
      }
      mode.authorities = result.filter(item => item !== data);
      const savedRemoveAuthorities = await guildConfig.save();
      return {
        success: true,
        message: 'Yetki kaldırıldı.',
		data: savedRemoveAuthorities.toJSON()
      };

    case 'roles':
      if (!result.includes(data)) {
        return {
          success: false,
          message: 'Bu rol zaten listede değil!'
        };
      }
      mode.roles = result.filter(item => item !== data);
      const savedRemoveRoles = await guildConfig.save();
      return {
        success: true,
        message: 'Rol kaldırıldı.',
		data: savedRemoveRoles.toJSON()
      };

    case 'enable':
      mode.enable = false;
      const savedDisableEnable = await guildConfig.save();
      return {
        success: true,
        message: 'Enable devre dışı bırakıldı.',
		data: savedDisableEnable.toJSON()
      };

    case 'isAuthorities':
      mode.isAuthorities = false;
      const savedDisableAuth = await guildConfig.save();
      return {
        success: true,
        message: 'Authority enable devre dışı bırakıldı.',
		data: savedDisableAuth.toJSON()
      };

    default:
      return {
        success: false,
        message: 'Geçersiz tür belirtildi.'
      };
  }
}


export {
	getGuildConfig,
	createGuildConfig,
	guildConfigFindById,
	addItemToGuildConfig,
	removeItemFromGuildConfig,
	guildConfigUpdate
}