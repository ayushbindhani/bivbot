const Discord = require("discord.js");

module.exports = {
  name: "nuke",
  usage: "<prefix>nuke",
   category: "moderation",
  description: "delete all messages of your channel",

run: async(client, message, args) => {
if (!message.member.hasPermission("MANAGE_CHANNELS")|| !message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply(':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command')
    }
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(":x: I don't have enough permission to do that in this server!");
    let channel = client.channels.cache.get(message.channel.id)
var posisi = channel.position;
  
  
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send("Channel Has been nuked !",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
    }
}
