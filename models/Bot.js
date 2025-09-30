import mongoose from "mongoose"

const botSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    botId: { type: String },
    prefix: { type: String, default: "." }
})

export default mongoose.model("Bot", botSchema)