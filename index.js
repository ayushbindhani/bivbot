const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client({disableMentions: "everyone"});
client.config = require("./Config");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
const keepAlive = require('./server');


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence(`Hi, ${client.user.username} is now online! | Developed By Coding Wallah YouTube Channel`) 
})
  



client.on("message", async message => {
  let ping = [`<@${client.user.id}> `, `<@!${client.user.id}> `]
  if (!message.guild) return;

  if (!message.content.startsWith(client.config.prefix))return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));
  
    if (command) command.run(client, message, args)
});
keepAlive();

client.login("NzkwMTc4OTU3NTgzOTc0NDAx.X981gA.4RQYnN2A7Qu7YD5P_LAK6_dgf2Q")