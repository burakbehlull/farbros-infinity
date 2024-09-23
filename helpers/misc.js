const { GatewayIntentBits } = require("discord.js")

class Misc {
    IntensAll(){
        return Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
    }
}


module.exports = Misc