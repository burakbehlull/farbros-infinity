const Backup = require('../libs/backup')

module.exports = {
    time: 60000 * 360,
    isExecutibleOnLoaded: true,
    execute: (interaction) => {
        const backup = new Backup(interaction);

        await backup.roles();
    }
};