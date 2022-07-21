module.exports = {
  name: "interactionCreate",
  async execute(interaction, BcK) {
    console.log(
      `%c=>\t${interaction.user.tag} en #${interaction.channel.name} provoco una interaccion!.\n`,
      "color: white; background: purple;"
    );
    if (interaction.customId !== undefined) {
      const command = interaction.customId.split(" : ")[0];
      console.log(
        `%c=>\tCUSTOM_ID: ${interaction.customId}\n`,
        "color: white; background: purple;"
      );
      switch (command) {
        case "set_command":
          if (!interaction.isButton()) return;
          BcK.commands
            .find((command) => command.data.name === "set_command")
            .execute(interaction, BcK);
          break;

        case "stats":
          if (!interaction.isButton()) return;
          BcK.commands
            .find((command) => command.data.name === "stats")
            .execute(interaction, BcK);
          break;

        case "embeds_playlists":
          if (!interaction.isButton()) return;
          // TODO: Poner a playlist dentro del cliente, sin que sea un auto-command
          const playlists = require("../commands/auto_commands/playlists.js");
          await playlists.execute(interaction, BcK);
          break;

        case "embeds_colors":
          if (!interaction.isButton()) return;
          const colores = require("../commands/Funciones-Embed/colores.js");
          await colores.execute(interaction, BcK);
          break;

        default:
          console.log("No se encuentra el comando!");
          break;
      }
    }
  },
};
