const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        trim: true
    },
    banLimit: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User