const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roleBackupSchema = new Schema({
    roleId: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    roleColor: {
        type: String,
        required: false
    },
    members: [{
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }],
    guildId: {
        type: String,
        required: true
    },
    backedUpAt: {
        type: Date,
        default: Date.now
    }
});

const RoleBackup = mongoose.model('RoleBackup', roleBackupSchema);
module.exports = RoleBackup
