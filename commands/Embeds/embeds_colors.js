const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  // .setName("embeds_colors")
  // .setDescription("Muestra los colores disponibles para los roles!"),
  name: "embeds_colores",
  description: "Muestra los colores disponibles para los roles",
  async execute(interaction) {
    console.log(
      `%c❖ \t Se envio un embed colors `,
      "background: #AD8BF0; color: white"
    );
    await interaction.deferReply();

    const colores = new MessageEmbed()
      .setColor("#7fb5b5")
      .setTitle("˜”°•.˜”°• 𝒞𝑜𝓁𝑜𝓇𝑒𝓈 𝓅𝒶𝓇𝒶 𝓉𝑜𝒹𝑜𝓈 ! •°”˜.•°”˜")
      .setAuthor({
        name: "BeckS - Server",
        iconURL: "https://i.imgur.com/9mMUVDh.png",
        url: "https://github.com/OnlyAlec/Discord-BcK-Server",
      })
      .setDescription(
        "*Claro que si, un poco de personalización a tu nombre no esta mal, aquí tienes lo colores que te puedes poner para que aparezca en tu nombre.* <a:blobDance:878353650815221781>"
      )
      .addFields(
        {
          name: "Rojo          🟥",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Naranja    🟧",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Amarillo   🟨",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Verde       🟩",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Cian          🔵",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Azul           🟦",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Morado   🟪",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Rosa         🌸",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Cafe           🟫",
          value: "\u200B",
          inline: true,
        },
        {
          name: "Blanco      ⬜",
          value: "\u200B",
          inline: true,
        }
      )
      .setFooter({
        text: "Acuerdate necesitas darle click a uno de los botones de abajo! 👇🏻",
        iconURL: "https://i.imgur.com/zGeu5zT.gif",
      });
    const select1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟥`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟥"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟧`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟧"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟨`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟨"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟩`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟩"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🔵`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🔵")
    );

    const select2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟦`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟦"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🌸`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🌸"),
      new MessageButton()
        .setCustomId(`${this.data.name} : 🟫`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("🟫"),
      new MessageButton()
        .setCustomId(`${this.data.name} : ⬜`)
        .setLabel("")
        .setStyle("SECONDARY")
        .setEmoji("⬜")
    );

    await interaction.editReply({
      components: [select1, select2],
      embeds: [colores],
    });
  },
};
