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
	
  enable: { type: Boolean, default: true },
  prefix: { type: String, default: "." },
  
  guildId: { type: String, unique: true },
  
  logChannelId: { type: String, default: null },
  jailRoleId: { type: String, default: null },
  
  punishmentType: { 
	  type: String, 
	  enum: ["no-choice", "ban", "kick", "jail", "remove-roles", "remove-authorities", "remove-authorities-and-roles-give-jail", "disable-role-authorities", "ban-and-disable-guild-authorities"], 
	  required: true,
	  default: "ban",
  },
  
  roleDeleteGuard: { type: Boolean, default: true },
  roleUpdateGuard: { type: Boolean, default: true },
  channelDeleteGuard: { type: Boolean, default: true },
  channelUpdateGuard: { type: Boolean, default: true },
  botAddGuard: { type: Boolean, default: true },
  kickGuard: { type: Boolean, default: true },
  memberRoleGuard: { type: Boolean, default: true },
  guildUrlGuard: { type: Boolean, default: true },
  
  messageCommandExecuter: { type: Boolean, default: true },
  slashCommandExecuter: { type: Boolean, default: true },
  

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
