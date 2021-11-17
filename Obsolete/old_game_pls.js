const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
// Const img = require('images-scraper');
// const puppeteer = require('puppeteer');

// const google = new img({
// 	puppeteer : {
// 		headless : false,
// 		args: ['--no-sandbox', '--disable-setuid-sandbox'],
// 	},
// });

module.exports = {
  data: new SlashCommandBuilder(),
  name: "oldgamepls",
  cooldown: 5,
  description: "Embed con la informacion del juego actual",
  async execute(message) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const google = new img({
      puppeteer: browser,
    });
    if (!message.mentions.users.size) {
      return message.reply(
        " ¿Pero de quien quieres saber? ***Mencionalo con @ !***",
      );
    }
    const taggedUser = message.mentions.users.first();
    const userGame =
      taggedUser.presence.activities.find(
        (activity) => activity.type === "PLAYING",
      ) || null;
    // Condicionales
    if (userGame) {
      message.reply(" Un momento...").then((msg) => [
        msg.delete({
          timeout: 9500,
        }),
      ]);
      const query = userGame ? `${userGame.name} game color logo` : null;
      const results = await google.scrape(query, 1);

      const IsGame = new Discord.MessageEmbed()
        .setColor("#16F4D0")
        .setTitle("¿Que esta jugando?")
        .setAuthor(
          taggedUser.username,
          taggedUser.displayAvatarURL(),
          taggedUser.displayAvatarURL(),
        )
        .setImage(results[0].url)
        .addFields({
          name: `"${taggedUser.username}" esta jugando...`,
          value: `*❮   ${userGame.name}*   ❯`,
        })
        .setFooter(
          "Comando: *gamepls \nCon este comando puedes saber que jeugos estan jugando los mieembros del servidor uwu.\n",
          "https://i.imgur.com/TKC30qM.png",
        )
        .setTimestamp();
      message.channel.send(IsGame);
      message.react("✅");
    } else {
      const NoGame = new Discord.MessageEmbed()
        .setColor("#960200")
        .setTitle("¿Que esta jugando?")
        .setAuthor(
          taggedUser.username,
          taggedUser.displayAvatarURL(),
          taggedUser.displayAvatarURL(),
        )
        .setImage("https://i.imgur.com/j2Pc9Gl.png")
        .addFields({
          name: `"${taggedUser.username}" no esta jugando...`,
          value: "Invitalo a jugar algo :3",
        })
        .setFooter(
          "Comando: *gamepls \nCon este comando puedes saber que jeugos estan jugando los mieembros del servidor uwu.\n",
          "https://i.imgur.com/TKC30qM.png",
        )
        .setTimestamp();

      message.channel.send(NoGame);
      message.react("😥");
    }
  },
};
