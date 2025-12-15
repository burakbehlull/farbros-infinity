import { GuildConfig } from "#models"

async function getGuildConfig(values){
	const { guildId } = values.params
	let data;
	data = await GuildConfig.findOne({guildId})

	if(!data) {
		data = await createGuildConfig(guildId)
		return {
			success: false,
			message: 'Böyle bir guild yok, yeni döküman oluşturuldu',
			data
		}
	}

	return {
		code: 200,
		success: true,
		message: 'Döküman çekildi.',
		data
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
		data: guildConfig
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
		data: data
	}	
}

async function guildConfigUpdate(guildId, data){
	const guildConfig = await GuildConfig.findOne({guildId})
	
	if(data.enable) guildConfig.enable = data.enable
	if(data.prefix) guildConfig.prefix = data.prefix
	if(data.logChannelId) guildConfig.logChannelId = data.logChannelId
	if(data.jailRoleId) guildConfig.jailRoleId = data.jailRoleId
	if(data.punishmentType) guildConfig.punishmentType = data.punishmentType
	
	const result = await data.save()
	
	
	return {
		success: true,
		message: 'Döküman güncellendi.',
		data: result
	}	
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
			await guildConfig.save()
			return {
				success: true,
				message: 'Üye eklendi.'	
			}
		case 'authorities':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu yetki zaten tanımlanmış!'	
			}
			result.push(data)
			await guildConfig.save()
			return {
				success: true,
				message: 'Yetki eklendi.'	
			}
		case 'roles':
			if(result.includes(data)) return {
				success: false,
				message: 'Bu rol zaten var!'	
			}
			result.push(data)
			await guildConfig.save()
			return {
				success: true,
				message: 'Rol eklendi.'	
			}
		case 'enable':
			mode.enable = data
			await guildConfig.save()
			return {
				success: true,
				message: 'Enable güncellendi'	
			}
		case 'isAuthorities':
			mode.isAuthorities = data
			await guildConfig.save()
			return {
				success: true,
				message: 'Authority enable güncellendi'	
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
      await guildConfig.save();
      return {
        success: true,
        message: 'Üye kaldırıldı.'
      };

    case 'authorities':
      if (!result.includes(data)) {
        return {
          success: false,
          message: 'Bu yetki zaten listede değil!'
        };
      }
      mode.authorities = result.filter(item => item !== data);
      await guildConfig.save();
      return {
        success: true,
        message: 'Yetki kaldırıldı.'
      };

    case 'roles':
      if (!result.includes(data)) {
        return {
          success: false,
          message: 'Bu rol zaten listede değil!'
        };
      }
      mode.roles = result.filter(item => item !== data);
      await guildConfig.save();
      return {
        success: true,
        message: 'Rol kaldırıldı.'
      };

    case 'enable':
      mode.enable = false;
      await guildConfig.save();
      return {
        success: true,
        message: 'Enable devre dışı bırakıldı.'
      };

    case 'isAuthorities':
      mode.isAuthorities = false;
      await guildConfig.save();
      return {
        success: true,
        message: 'Authority enable devre dışı bırakıldı.'
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