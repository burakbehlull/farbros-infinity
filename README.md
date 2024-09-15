# Farbros Infinity
### Full-featured guard bot

Features:
Permission Manager functions and uses:
| Name | Status | Event | 
| -------- | -------- | -------- | 
| Role Guard | Stabil | ... |
| Channel Guard | Stabil | ... | 
| Guild Guard | Stabil | ... | 
| Vanity URL Guard | Stabil | ... | 
| Ban Guard | Stabil | ... | 
| Ban Limit Guard | Stabil | ... | 
| Bot Guard | Stabil | ... | 
| Kick Guard | Stabil | ... | 

Create ` .env ` file and paste the following:
```.env
TOKEN = BOT TOKEN YOUR HERE
BOT_ID = BOT CLIENT ID
MONGO_URI = MONGODB DATABASE URI

// URL GUARD SETTINGS
ACCOUNT_TOKEN = 
VANITY_URL = 
```


Create ` config.json ` file and set permission settings:
```json
{
    "isOwner": true,
    "isRoles": true,
    "isAuthority": false,

    "owners": [], // Person IDs to be whitelisted
    "roles": [], // fixed role id's

    "LogChannel": "", // Log Channel id
    "banLimit": 4, // Ban limit,

    // event on-off
    "isChannelDelete": true,
    "isChannelUpdate": true,
    "isRoleDelete": true,
    "isRoleUpdate": true,
    "isAntiBot": true,
    "isKickGuard": true,
    "isBanGuard": true,
    "isURLAndGuildGuard": true,

}
```


Permission Manager functions and uses:
| Function | Values | Use | 
| -------- | -------- | -------- | 
| .isOwners() | userId | ... | 
| .isRoles() | userId, firstOnce | ... | 
| .isAuthority() | userId, authorities, firstOnce | .isAuthority(userId, new PermissionManager().flags.Administrator) | 
| .selectOwnerIds() | status, key, userId | ... | 
| .selectRolesId() | status, key, userId, firstOnce | For example, you can open "whitelist": [user ids] in config.json and then use the whitelist as the key and use the incoming id as a fixed list. | 

Values ​​accessible from class:
` interaction `, ` config (config.json)`, ` flags (PermissionsBitField) `
