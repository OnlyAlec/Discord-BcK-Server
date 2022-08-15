/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
// TODO: Exportar la parte que usa request => fetch

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mc_server")
    .setDescription("Checa el estado del servidor mc!")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("Dirreccion IP del servidor!")
        .setRequired(true)
    ),
  async execute(interaction, BcK) {
    await interaction.deferReply();
    const mcIP = interaction.options._hoistedOptions[0].value;
    if (Validate_IP(interaction, mcIP)) {
      const url = `http://mcapi.us/server/status?ip=${mcIP}&port=25565`;
      let embedMC;
      await fetch(url)
        .then((response) => response.json()) // convertir a json
        .then(async (json) => {
          console.log(json);
          embedMC = await contruct_Embeds(json, mcIP, interaction);
        })
        .catch((err) => console.log("Solicitud HTTP fallida!\n", err)); // Capturar errores
      wipe("831335934808686642", interaction.client);

      interaction
        .editReply(">\tEsperando Peticion... OuO")
        .then(async (msg) => {
          BcK.channels.cache
            .get("832335604611547186")
            .send(`> **IP Request:** ${mcIP}`);

          BcK.channels.cache
            .get("831335934808686642")
            .send({ embeds: [embedMC] });
          msg.delete();
        });
    }
  },
};

function Validate_IP(message, IPC) {
  IPC = IPC.toLowerCase();
  const URL =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const IP =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (/(\d)+$/.test(IPC)) {
    if (IPC.match(IP)) return true;
    else {
      message.editReply(
        "*La direccion **IP** parace ser **Invalida**!*.\nIntenta de nuevo!"
      );
      return false;
    }
  } else if (IPC.match(URL)) return true;
  else {
    message.editReply(
      "*La direccion **URL** parace ser **Invalida**!*.\nIntenta de nuevo!"
    );
    return false;
  }
}
function extract_Content(resp) {
  const htmlToText = JSDOM.fragment(resp.html).textContent;
  console.log("\t%cHTML => Text ⦿\n", "background: #5d359c; color: white");
  return htmlToText
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/\s+/g, " ");
}
async function extract_Motd(motd) {
  const url = `https://mctools.org/motd-creator/json?motd=${motd}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("\t%cMotd => HTML ⦿", "background: #5d359c; color: white");
  return (motd = extract_Content(await response.json()));
}
async function contruct_Embeds(data, mcIP, interaction) {
  let embed;
  try {
    if (data.online) {
      // Status = (`\n El servido esta *En linea*:\n ${data.motd}\n Version del servidor: ***${boserver.name}*** \n`);
      embed = new MessageEmbed()
        .setColor("#4DC436")
        .setTitle("Estado del Servidor!...")
        .setAuthor({
          name: "BeckS - Minecraft!",
          iconURL: "https://i.imgur.com/9mMUVDh.png",
          url: "https://github.com/OnlyAlec/Discord-BcK-Server",
        })
        .setThumbnail("https://img.icons8.com/fluent/344/minecraft-logo.png")
        .addFields(
          {
            name: "Direccion IP: ",
            value: `➤ *${mcIP}*`,
          },
          {
            name: "Servidor en linea:",
            value: `${await extract_Motd(data.motd)}`,
          },
          {
            name: "Jugadores:",
            value: `➤ **${data.players.now}** de **${data.players.max}**`,
            inline: true,
          },
          {
            name: "Version del servidor:",
            value: `*${data.server.name}*`,
            inline: true,
          },
          {
            name: "Peticion de:",
            value: `➤ <@${interaction.user.id}>`,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Comando /mc_server \nCon este comando puedes ver el estado del servidor de Minecraft!",
          iconURL: "https://i.imgur.com/TKC30qM.png",
        });
    } else {
      embed = new MessageEmbed()
        .setColor("#DE1A1A")
        .setTitle("Estado del servidor...")
        .setAuthor({
          name: "BeckS - Minecraft!",
          iconURL: "https://i.imgur.com/9mMUVDh.png",
          url: "https://github.com/OnlyAlec/Discord-BcK-Server",
        })
        .setThumbnail("https://i.imgur.com/NhQIt0m.png")
        .addFields(
          {
            name: "Direccion IP: ",
            value: `**${mcIP}**`,
          },
          {
            name: "Servidor:",
            value: " ➤ Sin conexion :c",
          },
          {
            name: "Si quieres jugar:",
            value: `   ➤ Avisale a cualquier <@&821845901952811060>`,
          },
          {
            name: "Peticion de:",
            value: ` ➤ <@${interaction.user.id}>`,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Comando /mc_server \nCon este comando puedes ver el estado del servidor de Minecraft!",
          iconURL: "https://i.imgur.com/TKC30qM.png",
        });
    }
    return embed;
  } catch (error) {
    console.log(error);
  }
}

async function wipe(id, BcK) {
  const msg = BcK.channels.cache.get(id);
  var msg_size = 100;
  while (msg_size === 100) {
    await msg.messages.channel
      .bulkDelete(100, true)
      .then((messages) => (msg_size = messages.size))
      .catch(console.error);
  }
}
