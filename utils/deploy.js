require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
  execute() {
    let styles = ["background: white", "color: black"].join(";");
    const commands = [];
    const commandFolders = fs.readdirSync("./commands");

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`.././commands/${folder}/${file}`);
        if (command.data?.name !== undefined) {
          commands.push(command.data.toJSON());
        }
      }
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      console.log("%cRecargando las apliaciones (/)", styles);
      try {
        await rest.put(
          Routes.applicationGuildCommands(
            process.env.CLIENTID,
            process.env.GUILDID
          ),
          { body: commands }
        );
        console.log("%cSatisfactorio!\n", styles);
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
