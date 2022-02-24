/* eslint-disable no-await-in-loop */
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
let time = false;

module.exports = {
  name: "auto-playlists",
  description: "Reproduce las playlists del server!",
  async execute(interaction, BcK) {
    if (BcK === undefined) {
      return;
    }
    console.log("%c⇢\t Playlists ", "background: #CE796B; color: white");

    if (interaction.customId.split(": ")[1] === "Cancel") {
      interaction.channel.messages.fetch({ limit: 1 }).then((embed) => {
        embed.first().delete();
      });
      sendEmbed(interaction, undefined);
      time = true;
    } else {
      await interaction.deferReply();
      interaction
        .editReply("Checando si estas en un canal de voz!...")
        .then(async (msg) => {
          let value = await IsVoice(interaction, 0, BcK);
          if (value === 1) {
            // Si esta en VC [value = 1]
            playlistSelected(interaction);
          } else if (value === 2) {
            // Si esta en AFK [value = 2]
            sendEmbed(interaction, (value = 2));
          } else {
            // Si no esta conectado a VC [value = 0]
            const playlistSelect = undefined;
            sendEmbed(interaction, value, playlistSelect, BcK);
          }
          setTimeout(() => msg.delete(), 1000);
        });
    }
  },
};

// Funciones
function playlistSelected(interaction) {
  let value;
  const Emote = interaction.customId.split(": ")[1];

  switch (Emote) {
    case "🔀": {
      const playlistSelect = "Shuffle/Random [?]";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🎛️": {
      const playlistSelect = "Electronica";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🎙️": {
      const playlistSelect = "Trap";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🥵": {
      const playlistSelect = "Mueve el Butt";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🤘🏻": {
      const playlistSelect = "Rock&Roll";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🇲🇽": {
      const playlistSelect = "Español";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🛏️": {
      const playlistSelect = "Chill Ingles";
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
    case "🎤": {
      const playlistSelect = "FDM";
      value = 1;
      sendEmbed(interaction, value, playlistSelect);
      break;
    }
  }
}
async function IsVoice(interaction, value, BcK) {
  const guild = interaction.guild;
  const member = await guild.members.cache.get(interaction.user.id);

  if (member.voice.channelId === "823965821654532096") {
    // AFK
    value = 2;
    return false;
  } else if (member.voice.channel) {
    // In vc?
    BcK.channels.cache
      .get("832335604611547186")
      .send(
        `**Playlist!**\n> ${interaction.customId.split(": ")[1]} # <#${
          member.voice.channel.id
        }>`,
      );
    console.log(
      `%c❖\t${member.user.username} solicito playlist en ${member.voice.channel.name}`,
      "background:#CD5C5C; color: white",
    );
    return 1;
  } else {
    // Not VC
    return 0;
  }
}
async function waitVC(interaction, embed, value, BcK) {
  let valid = 0;
  // Cuando termine el tiempo
  setTimeout(() => {
    time = true;
    valid = 1;
  }, 300000);
  console.log(embed);
  // Checa VC hasta que no pase el tiempo
  do {
    // Si encontro VC, para el ciclo
    if (await IsVoice(interaction, value, BcK)) {
      playlistSelected(interaction);
      time = true;
      embed.delete();
    } else {
      await sleep(10000);
    }
  } while (time !== true);

  // Si ya paso el tiempo y fue por el cronometro
  if (time === true && valid === 1) {
    sendEmbed(interaction, undefined);
    embed.delete();
  }
}

async function sendEmbed(interaction, value, playlistSelect, BcK) {
  const customId = interaction.customId.split(": ")[0];
  switch (value) {
    case 1: {
      // Success
      const Success = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Playlists para Todos 👯‍♂️")
        .setAuthor(
          "BecKS - Playlists!",
          "https://i.imgur.com/9mMUVDh.png",
          "https://github.com/OnlyAlec/Discord-BcK-Server",
        )
        .setDescription("En un momento se conectara <@887025556967817287>!")
        .setThumbnail(
          "https://c.tenor.com/Qakq7KgQD1cAAAAi/fox-listening-to-music.gif",
        )
        .addFields({
          name: "La playlist que solicitaste fue:",
          value: `${playlistSelect}`,
        })
        .setFooter(
          `Peticion de: ${interaction.user.username}!.`,
          interaction.user.displayAvatarURL(),
        )
        .setTimestamp();

      let emoteEmd = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${customId} : InVC`)
          .setLabel("")
          .setStyle("SECONDARY")
          .setEmoji("🎶")
          .setDisabled(true),
      );

      await interaction.followUp({
        components: [emoteEmd],
        embeds: [Success],
        ephemeral: true,
      });
      break;
    }
    case 2: {
      // AFK
      const AFK = new MessageEmbed()
        .setColor("#a83832")
        .setTitle("Playlists para Todos 👯‍♂️")
        .setAuthor(
          "BecKS - Playlists!",
          "https://i.imgur.com/9mMUVDh.png",
          "https://github.com/OnlyAlec/Discord-BcK-Server",
        )
        .setThumbnail("https://img.icons8.com/fluent/344/music.png")
        .addFields({
          name: "Oye...",
          value: "No estabas 𝔸𝔽𝕂?. Tu solicitud fue cancelada!",
        })
        .setFooter("???", interaction.user.displayAvatarURL())
        .setTimestamp();

      await interaction.client.users.cache.get(interaction.user.id).send({
        embeds: [AFK],
      });
      break;
    }
    case 0: {
      // Not VC
      const NoVC = new MessageEmbed()
        .setColor("#a83832")
        .setTitle("Playlists para Todos 👯‍♂️")
        .setAuthor(
          "BecKS - Playlists!",
          "https://i.imgur.com/9mMUVDh.png",
          "https://github.com/OnlyAlec/Discord-BcK-Server",
        )
        .setThumbnail("https://img.icons8.com/fluent/344/music.png")
        .addFields(
          {
            name: "\u200B",
            value: "Creo que no estas conectado a ningun canal de voz!.",
          },
          {
            name: "『 Te esperamos a que te conectes a uno ! 』",
            value:
              "Tienes 5 minutos para conectarte, de lo contrario se cancelara la operacion!",
          },
        )
        .setFooter(
          `Peticion de: ${interaction.user.username}!.`,
          interaction.user.displayAvatarURL(),
        )
        .setTimestamp();

      const emoteEmd = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${customId} : NoVC`)
          .setLabel("")
          .setStyle("SECONDARY")
          .setEmoji("😥")
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`${customId} : Cancel`)
          .setLabel("")
          .setStyle("PRIMARY")
          .setEmoji("❌"),
      );

      await interaction
        .followUp({
          components: [emoteEmd],
          embeds: [NoVC],
        })
        .then((embed) => {
          waitVC(interaction, embed, value, BcK);
        });
      break;
    }
    default:
      {
        const cancel = new MessageEmbed()
          .setColor("#DC143C")
          .setTitle("Playlists para Todos 👯‍♂️")
          .setAuthor(
            "BecKS - Playlists!",
            "https://i.imgur.com/9mMUVDh.png",
            "https://github.com/OnlyAlec/Discord-BcK-Server",
          )
          .setThumbnail("https://imgur.com/u7FaMSh.png")
          .addFields({
            name: "Se cancelo la operacion!",
            value: "\u200b",
          })
          .setFooter(
            `Peticion de: ${interaction.user.username}!.`,
            interaction.user.displayAvatarURL(),
          )
          .setTimestamp();

        const emoteEmd = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${customId} : Cancel`)
            .setLabel("")
            .setStyle("PRIMARY")
            .setEmoji("❌")
            .setDisabled(true),
        );

        await interaction.client.users.cache.get(interaction.user.id).send({
          components: [emoteEmd],
          embeds: [cancel],
        });
      }
      break;
  }
  console.log(
    `%c\t ❖\tSe envio un embed ${value}   `,
    "background: #AD8BF0; color: white",
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
