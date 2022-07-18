const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "auto-tetrio",
  description: "Muestra las estadisticas que acabas de jugar en Tetris League",
  execute(BcK) {
    BcK.on("presenceUpdate", async (oldMember, newMember) => {
      const dataTetrio = newMember.activities.find(
        (game) => game.name === "TETR.IO"
      );
      if (
        dataTetrio?.details === "TETRA LEAGUE" &&
        dataTetrio?.state === "Game Ending"
      ) {
        console.log(
          "%c⇢\tTetr.io Activo!",
          "background: #CE796B; color: white"
        );
        const data = await getInfoUser(dataTetrio.assets.largeText);
        sendEmbed(data, BcK, newMember);
      }
    });
  },
};

async function getInfoUser(dataMember) {
  const user = dataMember.split(" ")[0].toLowerCase();
  const urlUser = `https://ch.tetr.io/api/users/${user}`;
  let response = await fetch(urlUser, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const user_data = await response.json();
  try {
    if (!user_data?.error) {
      const urlMatch = `https://ch.tetr.io/api/streams/league_userrecent_${user_data.data.user._id}`;
      response = await fetch(urlMatch, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const match_data = await response.json();

      let returnData = { user: user_data, match: match_data.data.records[0] };
      if (returnData.match.endcontext[1].username === user) {
        returnData.match.endcontext.reverse(); // Para mantener el usuario en posicion 0
      }
      console.log("%c❖\tUsuario API:\n", "background:#CD5C5C; color: white");
      console.log(returnData.user);
      console.log(returnData.match);
      return returnData;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

function sendEmbed(dataTetrio, BcK, dataMember) {
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("˜”*°•    𝙍𝙚𝙥𝙤𝙧𝙩𝙚 𝙙𝙚 𝙋𝙖𝙧𝙩𝙞𝙙𝙖 !    •°*”˜")
    .setDescription(
      `***Jugador de partida:***  ${dataTetrio.user.data.user.username
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}
        ***Nivel:*** ${XPtoLevel(dataTetrio.user.data.user.xp).toFixed(
          0
        )} (***XP:*** ${dataTetrio.user.data.user.xp.toFixed(0)})
        \n***Rank:*** **${
          dataTetrio.user.data.user.league.rank
        }** ${textToEmote(
        dataTetrio.user.data.user.league.rank
      )} \n***Puntos:*** ${dataTetrio.user.data.user.league.rating.toFixed(0)}`
    )
    .setThumbnail("https://i.imgur.com/nArQ2Ax.gif")
    .addFields(
      {
        name:
          dataTetrio.match.endcontext[0].points.primary >
          dataTetrio.match.endcontext[1].points.primary
            ? "🢖   ***Victoria***   🢔"
            : "🢖   ***Derrota***   🢔",
        value: `<:vs:998576475873751050> ***Rival:*** ${dataTetrio.match.endcontext[1].user.username}\n<:punt:998576789980979210> ***${dataTetrio.match.endcontext[0].points.primary} : ${dataTetrio.match.endcontext[1].points.primary} ***`,
        inline: true,
      },
      {
        name: "\u200B",
        value: "\u200B",
        inline: true,
      },
      {
        name: "Estadisticas",
        value: `<:pieces:998578496790085782> ***PPS:*** ${dataTetrio.match.endcontext[0].points.tertiary.toFixed(
          2
        )} | ${dataTetrio.match.endcontext[1].points.tertiary.toFixed(
          2
        )} \n<:attack:998578497809305640> ***APM:*** ${dataTetrio.match.endcontext[0].points.secondary.toFixed(
          2
        )} | ${dataTetrio.match.endcontext[1].points.secondary.toFixed(
          2
        )}\n<:score:998578499088564254> ***VS:*** ${dataTetrio.match.endcontext[0].points.extra.vs.toFixed(
          2
        )} | ${dataTetrio.match.endcontext[1].points.extra.vs.toFixed(2)}`,
        inline: true,
      },
      {
        name: "***Repeticion:***",
        value: `[Link Aqui](https://tetr.io/#r:${dataTetrio.match.replayid})`,
      }
    )
    .setAuthor({
      name: "BeckS - ᴛᴇᴛʀɪꜱ",
      iconURL: "https://i.imgur.com/9mMUVDh.png",
      url: "https://github.com/OnlyAlec/Discord-BcK-Server",
    })
    .setImage("https://ch.tetr.io/res/logo.png")
    .setFooter({
      text: `Reporte para: ${dataMember.member.nickname}`,
      iconURL: dataMember.user.avatarURL(),
    })
    .setTimestamp();

  BcK.channels.cache.get("944235909367349248").send({ embeds: [embed] });
}

function XPtoLevel(xp) {
  return (
    Math.pow(xp / 500, 0.6) + xp / (5000 + Math.max(0, xp - 4000000) / 5000) + 1
  );
}

// TODO: Enlazar Emotes
function textToEmote(text) {
  switch (text) {
    case "d":
      return "<:rank_d:998570902855884921>";
      break;
    case "d+":
      return "<:rank_dp:998570904311312434>";
      break;
    case "c-":
      return "<:rank_cs:998570906064523405>";
      break;
    case "c":
      return "<:rank_c:998570907071152158>";
      break;
    case "c+":
      return "<:rank_cp:998570905196310589>";
      break;
    case "b-":
      return "<:rank_bs:998570909281566780>";
      break;
    case "b":
      return "<:rank_b:998570908040044554>";
      break;
    case "b+":
      return "<:rank_bp:998570910384664606>";
      break;
    case "a-":
      return "<:rank_as:998570912792186890>";
      break;
    case "a":
      return "<:rank_a:998570911483560068>";
      break;
    case "a+":
      return "<:rank_ap:998570913534582875>";
      break;
    case "s-":
      return "<:rank_ssub:998570901249466478>";
      break;
    case "s":
      return "<:rank_s:998570899865354312>";
      break;
    case "s+":
      return "<:rank_sp:998570901777944597>";
      break;
    case "ss":
      return "<:rank_ss:998570898246344704>";
      break;
    case "u":
      return "<:rank_u:998570896925130752>";
      break;
    case "x":
      return "<:rank_x:998570895176105985>";
      break;
    default:
      console.log("Error en emote funcion!");
      break;
  }
  return null;
}
