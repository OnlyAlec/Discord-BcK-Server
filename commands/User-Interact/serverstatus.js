/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
// TODO: Exportar la parte que usa request => fetch

const request = require("request");
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
    if (ValidateIPaddress(interaction, mcIP)) {
      const url = `http://mcapi.us/server/status?ip=${mcIP}&port=25565`;
      interaction
        .editReply(">\tEsperando Peticion... OuO")
        .then(async (msg) => {
          BcK.channels.cache
            .get("832335604611547186")
            .send(`> **IP Request:** ${mcIP}`);

          BcK.channels.cache
            .get("831335934808686642")
            .send({ embeds: [await getStatus(interaction, url, mcIP)] });

          msg.delete();
        });
    }
  },
};

// Funciones
function ValidateIPaddress(message, IPC) {
  IPC = IPC.toLowerCase();
  const URL =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const IP =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (/(\d)+$/.test(IPC)) {
    if (IPC.match(IP)) {
      return true;
    } else {
      message.editReply(
        "*La direccion **IP** parace ser **Invalida**!*.\nIntenta de nuevo!"
      );
      return false;
    }
  } else if (IPC.match(URL)) {
    return true;
  } else {
    message.editReply(
      "*La direccion **URL** parace ser **Invalida**!*.\nIntenta de nuevo!"
    );
    return false;
  }
}

function extractContent(resp) {
  const htmlToText = JSDOM.fragment(resp.html).textContent;
  console.log("\t%cHTML => Text ⦿\n", "background: #5d359c; color: white");
  return htmlToText
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/\s+/g, " ");
}
async function extractMotdToHtml(motd) {
  const url = `https://mctools.org/motd-creator/json?motd=${motd}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("\t%cMotd => HTML ⦿", "background: #5d359c; color: white");

  return (motd = extractContent(await response.json()));
}

function getStatus(interaction, url, mcIP) {
  wipe("831335934808686642", interaction.client);
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      let status;
      if (err) {
        console.log(err);
        reject(new Error("API error"));
      } else {
        body = JSON.parse(body);
        if (body.online) {
          // Status = (`\n El servido esta *En linea*:\n ${body.motd}\n Version del servidor: ***${body.server.name}*** \n`);
          const McOn = new MessageEmbed()
            .setColor("#4DC436")
            .setTitle("Estado del Servidor!...")
            .setAuthor(
              "BeckS - Minecraft!",
              "https://i.imgur.com/9mMUVDh.png",
              "https://github.com/OnlyAlec/Discord-BcK-Server"
            )
            .setThumbnail(
              "https://img.icons8.com/fluent/344/minecraft-logo.png"
            )
            .addFields(
              {
                name: "Direccion IP: ",
                value: `➤ *${mcIP}*`,
              },
              {
                name: "Servidor en linea:",
                value: `${await extractMotdToHtml(body.motd)}`,
              },
              {
                name: "Jugadores:",
                value: `➤ **${body.players.now}** de **${body.players.max}**`,
                inline: true,
              },
              {
                name: "Version del servidor:",
                value: `*${body.server.name}*`,
                inline: true,
              },
              {
                name: "Peticion de:",
                value: `➤ <@${interaction.user.id}>`,
              }
            )
            .setTimestamp()
            .setFooter(
              "Comando /mc_server \nCon este comando puedes ver el estado del servidor de Minecraft!",
              "https://i.imgur.com/TKC30qM.png"
            );
          status = McOn;
        } else {
          // Status = ` El servidor esta ***Apagado***, avisale a cualquier ${role} `;
          const McOff = new MessageEmbed()
            .setColor("#DE1A1A")
            .setTitle("Estado del servidor...")
            .setAuthor(
              "BeckS - Minecraft!",
              "https://i.imgur.com/9mMUVDh.png",
              "https://github.com/OnlyAlec/Discord-BcK-Server"
            )
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
            .setFooter(
              "Comando /mc_server \nCon este comando puedes ver el estado del servidor de Minecraft!",
              "https://i.imgur.com/TKC30qM.png"
            );
          status = McOff;
        }
        resolve(status);
      }
    });
  });
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
