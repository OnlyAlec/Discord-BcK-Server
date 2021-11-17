/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder(),
  name: "chPlaylists",
  description: "Playlists del server!",
  async execute(interaction, BcK) {
    await interaction.deferReply();
    let value;
    interaction
      .editReply("Checando si estas en un canal de voz!...")
      .then(async (msg) => {
        if (await IsVoice(interaction, value, BcK)) {
          playlistSelected(interaction);
        } else if (value === 3) {
          sendEmbed(interaction, (value = 2));
        } else {
          const playlistSelect = undefined;
          sendEmbed(interaction, value, playlistSelect, BcK);
        }
        setTimeout(() => msg.delete(), 1000);
      });
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
      sendEmbed(interaction, (value = 1), playlistSelect);
      break;
    }
  }
}
async function IsVoice(interaction, value, BcK) {
  const guild = interaction.guild;
  const member = await guild.members.cache.get(interaction.user.id);

  if (member.voice.channelId === "823965821654532096") {
    // AFK
    value = 3;
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
    return true;
  } else {
    // Not VC
    return false;
  }
}

async function sendEmbed(interaction, value, playlistSelect, BcK) {
  const customId = interaction.customId.split(": ")[0];
  if (value === 2) {
    const AFK = new MessageEmbed()
      .setColor("#a83832")
      .setTitle("Playlists para Todos 👯‍♂️")
      .setAuthor(
        "BecKS - Playlists!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK",
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
  } else if (value === 1) {
    const Success = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Playlists para Todos 👯‍♂️")
      .setAuthor(
        "BecKS - Playlists!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK",
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

    const emoteEmd = new MessageActionRow().addComponents(
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
  } else {
    let time = false;
    const NoVC = new MessageEmbed()
      .setColor("#a83832")
      .setTitle("Playlists para Todos 👯‍♂️")
      .setAuthor(
        "BecKS - Playlists!",
        "https://i.imgur.com/9mMUVDh.png",
        "https://github.com/OnlyAlec/Discord-BcK",
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
      // TODO: Rederigir el boton y poner bien su customID
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
      .then(async (embed) => {
        let valid = 0;
        setTimeout(() => {
          time = true;
          valid = 1;
        }, 300000);
        do {
          if (await IsVoice(interaction, value, BcK)) {
            playlistSelected(interaction);
            time = true;
            embed.delete();
          } else {
            await sleep(10000);
          }
        } while (time !== true);
        if (time === true && valid === 1) {
          interaction.client.users.cache
            .get(interaction.user.id)
            .send("=> Se cancelo la operacion de: 'Playlists!'");
          embed.delete();
        }
      });
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
