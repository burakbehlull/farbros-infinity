const Backup = require('../libs/backup')

module.exports = {
    time: 60000 * 360,
    isExecutableOnLoaded: true,
    execute: async (interaction) => {
        const backup = new Backup(interaction);

        await backup.roles();
        console.log('Yedek alındı');
        
    }
};