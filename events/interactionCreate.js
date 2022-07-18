module.exports = {
  name: "interactionCreate",
  async execute(interaction, BcK) {
    console.log(
      `%c=>\t${interaction.user.tag} en #${interaction.channel.name} provoco una interaccion!.\n`,
      "color: white; background: purple;"
    );
    if (interaction.customId !== undefined) {
      console.log(
        `%c=>\tCUSTOM_ID: ${interaction.customId}\n`,
        "color: white; background: purple;"
      );
    }
    if (
      interaction.customId
        ? interaction.customId.includes("set_command")
        : false
    ) {
      if (!interaction.isButton()) return;
      BcK.commands
        .find((command) => command.data.name === "set_command")
        .execute(interaction, BcK);
    } else if (
      interaction.customId ? interaction.customId.includes("stats") : false
    ) {
      if (!interaction.isButton()) return;
      await BcK.commands
        .find((command) => command.data.name === "stats")
        .execute(interaction, BcK);
    } else if (
      interaction.customId
        ? interaction.customId.includes("embeds_playlists")
        : false
    ) {
      if (!interaction.isButton()) return;
      // TODO: Poner a playlist dentro del cliente, sin que sea un auto-command
      const playlists = require("../commands/auto_commands/playlists.js");
      await playlists.execute(interaction, BcK);
    }
  },
};
