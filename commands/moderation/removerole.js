const discord = require("discord.js");

module.exports = {
  name: "removerole",
  usage: "<target user,s @> <the role name>",
  category: "moderation",
  run: async (client, message, args) => {
    
     if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send("I don't have enough permission to do that !");

    if (!message.member.hasPermission("MANAGE_ROLES")|| !message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command');
    
    const target = message.mentions.users.first();

    if (!target) {
      message.reply("please specify the user");
      return;
    }

    args.shift();

    const roleName = args.join(" ");
    const { guild } = message;

    const role = guild.roles.cache.find(role => {
      return role.name === roleName;
    });
    if (!role) {
      message.reply(`there is no role with the name "${roleName}"`);
      return;
    }
    
    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`Your role must be higher than **${role.name}** role!`);
    }

    const member = guild.members.cache.get(target.id);
    member.roles.remove(role);

    message.reply(`"${roleName}" role removed from the user`);
  }
};
