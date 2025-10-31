import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, 
  guildId: { type: String },
  limit: { type: Number, default: 0 },
})

export default mongoose.model("User", userSchema)
