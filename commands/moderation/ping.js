const discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "info",
    usage: "!ping",
    description: "Get the bot's ping!",
    run: async (client, message, args) => {

    let embed = new discord.MessageEmbed()
    .setAuthor("pong!", message.author.avatarURL())
    .addField("API Latency", Math.round(client.ws.ping) + "ms", true)
    .setColor("RANDOM");
   message.channel.send(embed)
  }

    }