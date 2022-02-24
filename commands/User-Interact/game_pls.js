/* eslint-disable max-len */
// TODO: Pasar lo de axios a fetch

const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("game_pls")
    .setDescription("Muestra lo que esta jugando la persona!")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("El usuario que quieres saber!")
        .setRequired(true),
    ),
  async execute(interaction) {
    await interaction.deferReply();
    console.log("%c⇢\t Game_Pls ", "background: #CE796B; color: white");

    try {
      const IDUser =
        interaction.options._hoistedOptions[0].value.split(/([0-9]{1,20})/)[1];
      const taggedUser = await interaction.guild.members.fetch(IDUser);
      const userGame =
        taggedUser.presence?.activities.find(
          (activity) => activity.type === "PLAYING",
        ) || null;

      if (!taggedUser.presence) {
        const Useroffline = new MessageEmbed()
          .setColor("#999494")
          .setTitle(
            `Actividad de ${
              taggedUser.nickname ? taggedUser.nickname : taggedUser.username
            }`,
          )
          .setAuthor(
            "BecKS - ¿Que esta jugando?",
            "https://i.imgur.com/9mMUVDh.png",
            "https://github.com/OnlyAlec/Discord-BcK-Server",
          )
          .setThumbnail("https://img.icons8.com/fluent/8x/no-network.png")
          .addFields({
            name: "Ups.. al parecer el usuario este *desconectado*...",
            value:
              "Posiblmente este dormido... o no se <:KEKW:878308619198799923>",
          })
          .setFooter(
            `Comando: /game_pls \nPeticion de: ${interaction.user.username}!.`,
            interaction.user.displayAvatarURL(),
          )
          .setTimestamp();

        const emoji = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${this.data.name}`)
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("😴")
            .setDisabled(true),
        );

        await interaction.editReply({
          components: [emoji],
          embeds: [Useroffline],
        });
      } else if (userGame) {
        const act_to_search = userGame.name.toString().split(" ").join("-");
        const urlsearch = `https://search.icons8.com/api/iconsets/v4/search?term=${act_to_search}-logo&amount=50&offset=0&platform=al&token=YMqw87VqiFXGKeStTwAQux2iX37tPM92nMQ4dhpC`;
        const icon = await getSearch(urlsearch);
        const game = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(
            `Actividad de ${
              taggedUser.nickname ? taggedUser.nickname : taggedUser.username
            }`,
          )
          .setAuthor(
            "BecKS - ¿Que esta jugando?",
            "https://i.imgur.com/9mMUVDh.png",
            "https://github.com/OnlyAlec/Discord-BcK-Server",
          )
          .setThumbnail(icon)
          .addFields(
            {
              name: "\u200B",
              value: `"<@${taggedUser.user.id}>" esta jugando a ...`,
            },
            {
              name: `❮        *${userGame.name}*        ❯`,
              value: "\u200B",
            },
          )
          .setFooter(
            `Comando: /game_pls \nPeticion de: ${interaction.user.username}!.`,
            interaction.user.displayAvatarURL(),
          )
          .setTimestamp();

        const emoji = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${this.data.name}`)
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("🤩")
            .setDisabled(true),
        );

        await interaction.editReply({ components: [emoji], embeds: [game] });
      } else if (!userGame) {
        const NoGame = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(
            `Actividad de ${
              taggedUser.nickname ? taggedUser.nickname : taggedUser.username
            }`,
          )
          .setAuthor(
            "BecKS - ¿Que esta jugando?",
            "https://i.imgur.com/9mMUVDh.png",
            "https://github.com/OnlyAlec/Discord-BcK-Server",
          )
          .setThumbnail("https://i.imgur.com/j2Pc9Gl.png")
          .addFields(
            {
              name: "\u200B",
              value: `"<@${taggedUser.user.id}>" no esta jugando algo...`,
            },
            {
              name: " 🕹  Puedes invitalo a jugar...",
              value: "\u200B",
            },
          )
          .setFooter(
            `Comando: /game_pls \nPeticion de: ${interaction.user.username}!.`,
            interaction.user.displayAvatarURL(),
          )
          .setTimestamp();

        const emoji = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`${this.data.name}`)
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("😥")
            .setDisabled(true),
        );

        await interaction.editReply({ components: [emoji], embeds: [NoGame] });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

function getSearch(urlsearch) {
  let iconf;
  return new Promise((resolve) => {
    axios
      .get(urlsearch)
      .then((m) => {
        const statusCode = m.status;
        const resp = m.data;
        let iconInfo;
        let n = 0;
        do {
          do {
            iconInfo = {
              name: resp.icons[n].commonName,
              id: resp.icons[n].id,
              style: resp.icons[n].platform,
              cat: resp.icons[n].category,
            };
            n += 1;
          } while (iconInfo.cat !== "Logos" && iconInfo.cat !== "Gaming");
          n = n++;
        } while (resp.icons[n].free === !true);

        const urlrequest = `https://img.icons8.com/${iconInfo.style}/8x/${iconInfo.name}.png`;
        iconf = urlrequest;
        console.log(
          `%c\t⇢ HTTPS STATUS: ${statusCode}\nIcon: ${iconf}`,
          "background: #CE796B; color: white",
        );

        resolve(iconf);
      })
      .catch((err) => {
        console.log(err);
        console.log(
          new Error(
            "%c\t⇢ Icon Not Found - API Error",
            "background: #CE796B; color: white",
          ),
        );
        resolve(
          "https://cdn-icons.flaticon.com/png/512/4467/premium/4467135.png?token=exp=1641424897~hmac=15b7faed03f7ffe197d0f350162c2867",
        );
      });
  });
}
