// TODO: Agregar cooldown
const fs = require("fs");
require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");

const BcK = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const prefix = process.env.PREFIX;
const commandFolders = fs.readdirSync("./commands");
BcK.commands = new Collection();
BcK.auto_commands = new Collection();

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.data.name !== undefined) {
      BcK.commands.set(command.data.name, command);
    } else {
      BcK.auto_commands.set(command.name, command);
    }
  }
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    BcK.once(event.name, (...args) => event.execute(...args, BcK));
  } else {
    BcK.on(event.name, (...args) => event.execute(...args, BcK));
  }
}

// CommandHandler
BcK.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = BcK.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, BcK);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Hubo un error al ejecutar este comando!",
      ephemeral: true,
    });
    BcK.users.cache
      .get("443998731310858242")
      .send(
        `Hubo un error en el modulo: ${prefix} **${interaction.commandName}**`,
      );
    BcK.users.cache.get("443998731310858242").send(`\`\`\`${error}\`\`\``);
  }
});

// Log In
console.log("%c\tLog-in client...", "background: teal; color: white");
BcK.login(process.env.TOKEN);

// Servidor WEB
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("ok");
});
server.listen(3000);
