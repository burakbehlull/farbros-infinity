const Backup = require('../libs/backup')

function Timer(interaction, onLoaded, time){
    if(!interaction) return
    
    const isOnLoaded = onLoaded ? true : false
    const isTime = time ?? 60 * 360
    return {
        time: isTime,
        executeOnLoaded: isOnLoaded,
        execute: async ()=> {
            const backup = new Backup(interaction)
            await backup.roles()
        }
    }
}

module.exports = {
    Timer
}