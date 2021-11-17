const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder(),
  // .setName('embeds_playlists')
  // .setDescription('Muestra todas las playlist que ponemos a tu disposicion!'),
  name: "embeds_playlists",
  description: "Muestra todas las playlist que ponemos a tu disposicion!",
  async execute(interaction) {
    await interaction.deferReply();

    const playlists = new MessageEmbed()
      .setColor("#11359C")
      .setTitle("Playlists para Todos 👯‍♂️")
      .setAuthor(
        "BecKS - Playlists!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK",
      )
      .setDescription(
        "***Para escuchar solo dale click a los botones de hasta abajo!***",
      )
      .setThumbnail("https://img.icons8.com/fluent/344/music.png")
      .addFields(
        {
          name: "Shuffle/Random [?]",
          value: "🔀",
          inline: true,
        },
        {
          name: "Electronica",
          value: "🎛️",
          inline: true,
        },
        {
          name: "Trap",
          value: "🎙️",
          inline: true,
        },
        {
          name: "Mueve el **Butt**",
          value: "🥵",
          inline: true,
        },
        {
          name: "Rock&Roll",
          value: "🤘🏻",
          inline: true,
        },
        {
          name: "Español",
          value: "🇲🇽",
          inline: true,
        },
        {
          name: "Chill Ingles",
          value: "🛏️",
          inline: true,
        },
        {
          name: "FDM",
          value: "🎤",
          inline: true,
        },
      )
      .setFooter(
        "Muestra todas las playlist que ponemos a tu disposicion!.",
        "https://i.imgur.com/TKC30qM.png",
      )
      .setTimestamp();

    const select1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name} : 🔀`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🔀"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🎛️`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🎛️"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🎙️`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🎙️"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🥵`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🥵"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🤘🏻`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🤘🏻"),
    );

    const select2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🇲🇽`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🇲🇽"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🛏️`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🛏️"),
      new MessageButton()
        .setCustomId(`${this.data.name}} : 🎤`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🎤"),
    );

    await interaction
      .editReply({ components: [select1, select2], embeds: [playlists] })
      .then((msg) => {
        fs.writeFile("./commands/To Change/IDChannel.txt", msg.id, (err) => {
          if (err) throw err;
        });
      });
  },
};
