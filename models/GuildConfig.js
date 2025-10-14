import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  enable: {
    type: Boolean,
    default: false,
  },
  isAuthorities: {
    type: Boolean,
    default: false,
  },
  authorities: {
    type: [String],
    default: [],
  },
  members: {
    type: [String],
    default: [],
  },
  roles: {
    type: [String],
    default: [],
  },
});

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, unique: true },
  
  prefix: { type: String, default: "." },
  logChannelId: { type: String, default: null },

  high: {
    type: levelSchema,
    default: () => ({}),
  },
  mid: {
    type: levelSchema,
    default: () => ({}),
  },
  low: {
    type: levelSchema,
    default: () => ({}),
  },
}, { versionKey: false });

export default mongoose.model("GuildConfig", guildConfigSchema);
