const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   description: "Locks a Channel",
   category: "moderation",  
   usage: "lock #channel",
   run: async(client, message, args) => {
   if (!message.member.hasPermission("MANAGE_CHANNELS")|| !message.member.hasPermission("ADMINISTRATOR")) {

   return message.channel.send(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command')

   }
     
     if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(`:x: **${message.author.username}**, you need ``ADMINISTRATOR`` or ``MANAGE CHANNELS`` permission to use this command`);

   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
     
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} has been Locked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}

}