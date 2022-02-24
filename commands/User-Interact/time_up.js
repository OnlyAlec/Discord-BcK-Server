const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time_up")
    .setDescription("Muestra el tiempo que ha estado activo el servidor"),
  once: true,

  async execute(interaction, BcK) {
    await interaction.deferReply();
    const TimeOnline = BcK.uptime;
    const timeon = new MessageEmbed()
      .setColor("#b5d182")
      .setTitle(`${BcK.user.username} - Tiempo activo !`)
      .setAuthor(
        "BecKS - Tiempo en linea!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK-Server",
      )
      .setThumbnail("https://i.imgur.com/OeV5VES.gif")
      .addFields({
        name: "Tiempo activo! ",
        value: `${mstomin(TimeOnline)}`,
      })
      .setTimestamp()
      .setFooter(
        "Comando: /timeup \nCheca si el bot esta vivo y cuanto tiempo lo a estado!.",
        "https://i.imgur.com/TKC30qM.png",
      );

    const emoji = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name}`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🤖")
        .setDisabled(true),
    );
    await interaction.editReply({
      components: [emoji],
      embeds: [timeon],
    });
  },
};

function mstomin(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
