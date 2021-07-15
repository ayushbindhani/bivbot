const Discord = module.require('discord.js');
const ms = require('ms');

module.exports = {
  name: "tempmute",
  usage: "<target user,s @> <the role name> <time>",
  category: "moderation",
  run: async (client, message, args) => {
     if(!message.member.hasPermission('MANAGE_MESSAGES')|| !message.member.hasPermission("ADMINISTRATOR"))
       return message.channel.send(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command');
    
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(":x: I don't have enough permission to do that in this server!");
    
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide a Member to TempMute.')

            let role = message.guild.roles.cache.find(role => role.name === "Muted") || message.guild.roles.cache.find(role => role.name === "muted")

            if (!role) return message.reply("Couldn't find the 'Muted' role.")

            let time = args[1];
            if (!time) {
                return message.reply("You didnt specify a time!");
            }

            member.roles.add(role);

            message.channel.send(`${member.user} has now been muted for ${ms(ms(time))}`)

            setTimeout( function () {
                member.roles.remove(role);
                message.channel.send(`${member.user} has been unmuted.`)
            }, ms(time));
     }
  }
