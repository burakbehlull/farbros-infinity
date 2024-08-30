const config = require('../config.json')

class PermissionsManager {

    constructor(interaction){
        this.interaction = interaction
        this.config = config
    }

    isOwners(userId){
        if(!userId) return
        const { isOwner, owners } = this.config
        if(isOwner) {
            return owners.includes(userId)
        }
    }
}
module.exports = PermissionsManager
