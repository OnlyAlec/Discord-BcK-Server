const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder(),
  // .setName('embeds_playlists')
  // .setDescription('Muestra todas las playlist que ponemos a tu disposicion!'),
  name: "embeds_playlists",
  description: "Muestra todas las playlist que ponemos a tu disposicion!",
  async execute(interaction) {
    console.log(
      `%cβ \t Se envio un embed playlist `,
      "background: #AD8BF0; color: white"
    );
    await interaction.deferReply();

    const playlists = new MessageEmbed()
      .setColor("#11359C")
      .setTitle("Playlists para Todos π―ββοΈ")
      .setAuthor(
        "BecKS - Playlists!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK-Server"
      )
      .setDescription(
        "***Para escuchar solo dale click a los botones de hasta abajo!***"
      )
      .setThumbnail("https://img.icons8.com/fluent/344/music.png")
      .addFields(
        {
          name: "Shuffle/Random [?]",
          value: "π",
          inline: true,
        },
        {
          name: "Electronica",
          value: "ποΈ",
          inline: true,
        },
        {
          name: "Trap",
          value: "ποΈ",
          inline: true,
        },
        {
          name: "Mueve el **Butt**",
          value: "π₯΅",
          inline: true,
        },
        {
          name: "Rock&Roll",
          value: "π€π»",
          inline: true,
        },
        {
          name: "EspaΓ±ol",
          value: "π²π½",
          inline: true,
        },
        {
          name: "Chill Ingles",
          value: "ποΈ",
          inline: true,
        },
        {
          name: "FDM",
          value: "π€",
          inline: true,
        }
      )
      .setFooter(
        "Muestra todas las playlist que ponemos a tu disposicion!.",
        "https://i.imgur.com/TKC30qM.png"
      )
      .setTimestamp();

    const select1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name} : π`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("π"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : ποΈ`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("ποΈ"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : ποΈ`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("ποΈ"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : π₯΅`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("π₯΅"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : π€π»`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("π€π»")
    );

    const select2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name}} : π²π½`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("π²π½"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : ποΈ`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("ποΈ"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : π€`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("π€")
    );

    await interaction.editReply({
      components: [select1, select2],
      embeds: [playlists],
    });
  },
};
