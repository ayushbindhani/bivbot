module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")|| !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command');
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }
    const user = message.mentions.members.first();
    if(!user) {
      return message.channel.send("Please mention the member to who you want to mute")
    }
    if(user.id === message.author.id) {
      return message.channel.send("I won't mute you");
    }
    let reason = args.slice(1).join(" ") || "No Reason!";
   
    let muterole = message.guild.roles.cache.find(x => x.name === "muted") || message.guild.roles.cache.find(x => x.name === "Muted")
    
      if(!muterole) {
      return message.channel.send("This server do not have role with name `Muted` / `muted`")
    }
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted")
    }
    user.roles.add(muterole)
await message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``)
    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``)
    
  }
};