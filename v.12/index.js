const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
require("dotenv").config();

const BcK = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
BcK.commands = new Discord.Collection();
BcK.cooldowns = new Discord.Collection();

const prefix = process.env.PREFIX;
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

console.log("MAIN      Log-in ...");
BcK.login();

BcK.once("ready", () => {
  BcK.user.setActivity("Tus peticiones", {
    type: "LISTENING",
  });
  auto_commands();
  BcK.channels.cache
    .get("832335604611547186")
    .send(`> Bot Encendido ${nowmoment}`);
  console.log("BcK Listo para todo!\n");
});

// COMANDOS GENERALES
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
    BcK.users
      .get("443998731310858242")
      .send(`> Hubo un error en el modulo: ${prefix}${command.name}`);
    BcK.users.get("443998731310858242").send(`\`\`\`${error}\`\`\``);
  }

  const { cooldowns } = BcK;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Necestias esperar **${timeLeft.toFixed(
          1,
        )}** segundos para volver a usar el comando: \`${command.name}\`.`,
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
});

// Funciones

function auto_commands() {
  BcK.commands
    .array()
    .find((command) => command.name === "auto-stats")
    .execute(BcK);
  BcK.commands
    .array()
    .find((command) => command.name === "auto-playlists")
    .execute(BcK);
  BcK.commands
    .array()
    .find((command) => command.name === "auto-detectgame")
    .execute(BcK);
}

// Servidor WEB
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("ok");
});
server.listen(3000);
