const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Muestra las estadisticas basicas del servidor"),

  async execute(interaction, BcK) {
    await interaction.deferReply();

    if (interaction.customId ? interaction.customId.includes(":") : false) {
      const msgCh = interaction.channel.messages.cache
        .map((m) => m)
        .filter((a) => a.embeds.length === 1)
        .reverse()[0];
      await msgCh.delete();
    }

    const guild = interaction.guild;
    const online_Members = guild.members.cache.filter(
      (member) => member.presence !== null && member.user.bot === false
    ).size;
    const bots = guild.members.cache.filter(
      (member) => member.user.bot === true
    ).size;

    const stats = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${guild.name} - Estadisticas`,
        "https://cdn.discordapp.com/icons/821845551921233920/9bcc1eb4e9a45b77b4a59d65353b1eb3.png",
        "https://github.com/OnlyAlec/Discord-BcK-Server"
      )
      .setTitle("Estadisticas del servidor")
      .setDescription(
        "Aqui podras observar las estadisticas basicas del servidor en el que te encuentras!"
      )
      .setThumbnail("https://i.imgur.com/GYf6G4v.png")
      .addFields(
        {
          name: "👥 Mienbros:",
          value: `***${guild.memberCount}***`,
          inline: true,
        },
        {
          name: "🤖 Bots: ",
          value: `***${bots}***`,
          inline: true,
        },
        {
          name: "🔆 En linea: ",
          value: `***${online_Members}***`,
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      );
    guild.roles.cache.forEach((role) => {
      const notRole = [
        "@everyone",
        "{ Bot'es }",
        "🤖 { Bck-Bots }",
        "ProBot",
        "Rythm",
        "Hydra",
      ];
      if (notRole.includes(role.name)) return;
      stats.addFields({
        name: `${role.name}`,
        value: `Personas con el role: **${role.members.size}**`,
        inline: true,
      });
    });
    stats
      .addFields(
        {
          name: "\u200B",
          value: "\u200B",
        },
        {
          name: "💻 Ping con el bot:",
          value: "Espere...",
          inline: true,
        },
        {
          name: "🖥 Ping con API",
          value: `**${Math.round(BcK.ws.ping)}**`,
          inline: true,
        },
        {
          name: "💠 Prefijo bot:",
          value: `   ${process.env.PREFIX}   `,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter(
        "Comando: /stats \n Con este comando ves las estadisticas basicas del servidor en el que estas. owo",
        "https://cdn.discordapp.com/icons/821845551921233920/9bcc1eb4e9a45b77b4a59d65353b1eb3.png"
      );

    const bt = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`${this.data.name} : Refresh`)
        .setLabel("Recargar")
        .setStyle("SECONDARY")
        .setEmoji("🔄")
    );

    await interaction
      .editReply({ components: [bt], embeds: [stats] })
      .then((m) => {
        const ping = m.createdTimestamp - interaction.createdTimestamp;
        const fieldMod = stats.fields.findIndex(
          (cms) => cms.name === "💻 Ping con el bot:"
        );

        stats.fields[fieldMod] = {
          name: "💻 Ping con el bot:",
          value: `**${ping}**`,
          inline: true,
        };

        m.edit({ embeds: [stats] });
      });
  },
};
