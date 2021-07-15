const Discord = module.require("discord.js");

module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
   category: "moderation",
   usage: "unlock #channel",
   run: async(client, message, args) => {

   if (!message.member.hasPermission('MANAGE_CHANNELS')|| !message.member.hasPermission("ADMINISTRATOR")) {
   return message.channel.send(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command')
   }
     if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(":x: I don't have enough permission to do that in this server!");

   message.channel.overwritePermissions([

     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);

   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔓 ${message.channel}  has been Unlocked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();

}

}