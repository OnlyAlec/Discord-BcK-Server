const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
require("dotenv").config();

const prefix = process.env.PREFIX;
const BcK = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
BcK.commands = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");
const nowmoment = moment().format("h:mm:ss a");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    BcK.commands.set(command.name, command);
  }
}

console.log("BETA     Log-in ...\n");
BcK.login();

BcK.on("ready", () => {
  BcK.user.setActivity("Codificando...", {
    type: "PLAYING",
  });
  // BcK.commands.array().find(command => command.name === 'auto-detectgame').execute(BcK);
  // BcK.commands.array().find(command => command.name === 'auto-playlists').execute(BcK);
  // BcK.commands.array().find(command => command.name === 'auto-moved').execute(BcK);
  BcK.channels.cache.get("832335604611547186").send("> Beta - Bot Encendido ");
  console.log(`Listo BcK Beta! ${nowmoment}`);
});

BcK.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    BcK.commands.get(commandName) ||
    BcK.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName),
    );
  if (!command) return message.reply("No existe este comando!");

  try {
    command.execute(message, args, BcK);
  } catch (error) {
    console.error(error);
    message.reply("Error al internar la ejecucion!");
    BcK.users.cache
      .get("832335604611547186")
      .send(`Hubo un error en el modulo: ${prefix}${command.name}`);
    BcK.users.cache
      .get("832335604611547186")
      .send(`Error: \`\`\`${error}\`\`\``);
  }
});
