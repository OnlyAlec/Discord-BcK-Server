const request = require("request");
const fs = require("fs");

module.exports = {
  name: "servermc",
  description: "Checa el estado del servidor mc!",
  args: true,
  async execute(message, args, BcK) {
    const user = message.author.toString();
    const role = message.guild.roles.cache.find((m) => {
      return m.name === "{ Onlys 👑 }";
    });
    const mcIP = fs.readFileSync("commands/MC/mcIP.txt", "utf8");
    const url = `http://mcapi.us/server/status?ip=${mcIP}&port=25565`;

    (await message.reply("Esperando Peticion...")).delete({
      timeout: 6500,
    });
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> **IP Request:** ${mcIP}`);
    BcK.channels.cache
      .get("831335934808686642")
      .send(await getStatus(role, user, url, mcIP));
    // Message.reply(await getStatus(request, role, user, url, mcIP));
    message.react("👍");
    message.delete({
      timeout: 180000,
    });
  },
};

// Funciones
function getStatus(role, user, url, mcIP) {
  return new Promise((resolve, reject) => {
    request(url, function(err, response, body) {
      let status;
      if (err) {
        console.log(err);
        reject(new Error("API error"));
      } else {
        body = JSON.parse(body);
        if (body.online) {
          // Status = (`\n El servido esta *En linea*:\n ${body.motd}\n Version del servidor: ***${body.server.name}*** \n`);
          const Discord = require("discord.js");
          const McOn = new Discord.MessageEmbed()
            .setColor("#4DC436")
            .setTitle("Estado del Servidor!")
            .setAuthor("BeckS - Minecraft")
            .setThumbnail(
              "https://img.icons8.com/fluent/344/minecraft-logo.png",
            )
            .addFields(
              {
                name: "IP Comprobada: ",
                value: `**${mcIP}**`,
              },
              {
                name: "En linea:",
                value: `*${body.motd}*`,
              },
              {
                name: "Jugadores:",
                value: `${body.players.now} de ${body.players.max}`,
                inline: true,
              },
              {
                name: "Version:",
                value: `*${body.server.name}*`,
                inline: true,
              },
              {
                name: "Peticion de:",
                value: `${user}`,
              },
            )
            .setTimestamp()
            .setFooter(
              "Comando *servermc \nCon este comando puedes ver el estado del servidor de Minecraft!",
              "https://i.imgur.com/TKC30qM.png",
            );
          status = McOn;
        } else {
          // Status = ` El servidor esta ***Apagado***, avisale a cualquier ${role} `;
          const Discord = require("discord.js");
          const McOff = new Discord.MessageEmbed()
            .setColor("#DE1A1A")
            .setTitle("Estado del servidor!")
            .setAuthor("BeckS - Minecraft")
            .setThumbnail(
              "https://img.icons8.com/fluent/344/minecraft-logo.png",
            )
            .addFields(
              {
                name: "IP Comprobada: ",
                value: `**${mcIP}**`,
              },
              {
                name: "El estado del servidor esta:",
                value: " ➤ Sin conexion :c",
              },
              {
                name: "Si quieres jugar:",
                value: `   ➤ Avisale a cualquier ${role}`,
              },
              {
                name: "Peticion de:",
                value: ` ➤ ${user}`,
              },
            )
            .setTimestamp()
            .setFooter(
              "Comando *servermc \nCon este comando puedes ver el estado del servidor de Minecraft!",
              "https://i.imgur.com/TKC30qM.png",
            );
          status = McOff;
        }
        resolve(status);
      }
    });
  });
}
