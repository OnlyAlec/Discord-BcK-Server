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

const prefix = process.env.PREFIX_MAIN;
const commandFolders = fs.readdirSync("./commands");
BcK.commands = new Collection();
BcK.auto_commands = new Collection();

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.data?.name !== undefined) {
      BcK.commands.set(command.data.name, command);
    } else if (command?.name.includes("auto")) {
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
BcK.login(process.env.TOKEN_MAIN);

// Webhook Heroku => Discord + Servidor Web
const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/webhook", (req, res) => {
  const Payload = req.body;
  // Respond To Heroku Webhook
  res.sendStatus(200);

  const options = {
    method: "POST",
    url: "",
    headers: {
      "Content-type": "application/json",
    },
    // Format JSON DATA
    body: JSON.stringify({
      content: `This is A Webhook notification!A build for your app ${Payload.data.app.name} was just triggered`,
    }),
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response);
  });
  res.writeHead(200);
  res.end("ok");
});
app.listen(3000, () =>
  console.log(
    "%c\tServer Web || Port 3000\n",
    "background: teal; color: white\n",
  ),
);
