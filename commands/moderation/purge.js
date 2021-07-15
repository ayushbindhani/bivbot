const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  category: "moderation",
  aliases: ["purge", "clearmsgs"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES")|| !message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        ':x: you need ```ADMINISTRATOR``` or ```MANAGE MESSAGES``` permission to use this command'
      );
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(":x: You Don't Have Permission To Use This Command!");

    if (!args[0])
      return message.channel.send(`Please Give Me Amounts Of Messages!`);

    if (isNaN(args[0]))
      return message.channel.send(`Please Give Me Number Value!`);

    if (args[0] < 1)
      return message.channel.send(
        `You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`
      );

    if (args[0] > 1000)
      return message.channel.send(
        `I Can't Delete ${args[0]} Because Of Discord Limit!`
      );

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";
message.channel.messages.fetch({ limit: args[0] })
  .then(fetched => {
    const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

    message.channel.bulkDelete(notPinned, true).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(`#00ffcc`)
        .setTitle(`Messages Deleted!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Channel`, `${message.channel.name} (${message.channel.id}`)
        .addField(`Deleted Messages`, `${Message.size}`)
        .addField(`Reason`, `${Reason}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  })
  }
}