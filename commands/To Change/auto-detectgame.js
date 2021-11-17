const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder(),
  name: "detectInRandom",
  description:
    "Detecta que juego esta juganado y renombra el canal de [ Random ]",
  async execute(BcK) {
    try {
      const ch_random = BcK.channels.cache.get("833915268942135326");
      if (ch_random.members.size >= 1) {
        calculateGame(ch_random, BcK);
      }
    } catch (err) {
      console.log(err);
      BcK.channels.cache.get("832335604611547186").send(`>>> ${err}`);
    }

    BcK.on("voiceStateUpdate", (oldMember, newMember) => {
      if (newMember.member.user.bot == true) {
      } else {
        try {
          const oldChannel = oldMember.channel;
          const newChannel = newMember.channel;
          const id_ch_random = "833915268942135326"; // ID canal que se conectan

          // Primera vez conectado a ch! *oldChannel = null*
          if (oldChannel == null && newChannel) {
            if (newChannel.id != id_ch_random) {
              return;
            } else if (newChannel.id == id_ch_random) {
              console.log("Primera vez que se conecta a [ Random ]");
              const channel = newMember.channel;
              calculateGame(channel, BcK);
            }
          }

          // Cuando se desconecta de ch! *newChannel = null*
          else if (newChannel == null && oldChannel) {
            if (oldChannel.id != id_ch_random) {
              return;
            } else if (oldChannel == id_ch_random) {
              console.log("Se desconecto de [ Random ]");
              const channel = oldMember.channel;
              calculateGame(channel, BcK);
            }
          }

          // Cuanso se mueve de Random a otro canal! (Desconectado de [Random])
          else if (
            oldChannel.id == id_ch_random &&
            newChannel.id != id_ch_random
          ) {
            console.log("Se desconecto de [ Random ]");
            const channel = oldMember.channel;
            calculateGame(channel, BcK);
          }

          // Se movio de otro canal a Random! *oldChannel !=(Diferente a) Random && newChannel == Random*
          else if (
            oldChannel.id != id_ch_random &&
            newChannel.id == id_ch_random
          ) {
            console.log("Se movio a [ Random ]");
            const channel = newMember.channel;
            calculateGame(channel, BcK);
          }
        } catch (err) {
          console.log(err);
          BcK.channels.cache.get("832335604611547186").send(`>>> ${err}`);
        }
      }
    });

    BcK.on("presenceUpdate", (oldMember, newMember) => {
      if (newMember.user.bot == true) {
      } else {
        try {
          const id_ch_random = "856812682703011860"; // ID canal que se conectan
          const newMember_ch = newMember.member.voice.channel;

          const old_Member_Activities = oldMember ? oldMember.activities : [];
          const old_Game_PLayed = old_Member_Activities.find(
            (activity) => activity.type === "PLAYING",
          )
            ? old_Member_Activities.find(
                (activity) => activity.type === "PLAYING",
              ).name
            : null;
          const new_Game_Played = newMember.activities.find(
            (activity) => activity.type === "PLAYING",
          )
            ? newMember.activities.find(
                (activity) => activity.type === "PLAYING",
              ).name
            : null;

          // Si hay informacion del nuevo canal, comparame si sigue conectado al canal y su anterior juego es distinto al nuevo!
          if (
            newMember_ch
              ? newMember_ch.id == id_ch_random &&
                old_Game_PLayed !== new_Game_Played
              : false
          ) {
            calculateGame(newMember_ch, BcK);
          }
        } catch (err) {
          console.log(err);
          BcK.channels.cache.get("832335604611547186").send(`>>> ${err}`);
        }
      }
    });
  },
};

function calculateGame(channel, BcK) {
  const games = {};
  const max = {
    game: [],
  };
  const members_in_channel = channel.members.array();
  const ch_rename = BcK.channels.cache.get("834220871177994250"); // Canal que se cambia de nombre

  // Por cada miembro, detecte que juego esta y hacer un array(lista) agregando el juego y la sumando la persona. Si el juego ya esta entonces agrega un contador al juego.
  members_in_channel.map((member) => {
    if (member.presence.activities.length >= 1) {
      const userGame =
        member.presence.activities.find(
          (activity) => activity.type === "PLAYING",
        ) !== undefined
          ? member.presence.activities.find(
              (activity) => activity.type === "PLAYING",
            ).name
          : undefined;
      if (userGame !== undefined && !(userGame in games)) {
        games[userGame] = 1;
      } else if (userGame !== undefined) {
        games[userGame]++;
      }
    }
  });

  Object.keys(games).forEach((name_game) => {
    // Games[name_game] = Regresa la cantidad de gente en el juego seleccionado!
    if (name_game != max.games) {
      max.game.push(name_game);
    }
  });

  if (max.game.length == 1) {
    console.log(`"${channel.name}" ahora juega "${max.game}"`);
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> <#${channel.id}> ahora juega "${max.game}"`);
    ch_rename.setName(`"${max.game[0]}"`);
  } else if (max.game.length >= 2) {
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Multiples juegos! <#${channel.id}> \n   Juegos: ${max.game}`);
    console.log(
      `En "${channel.name}" hay varios juegos! \n   Juegos: ${max.game}`,
    );
    ch_rename.setName("Varios juegos! 🕹");
  } else if (ch_rename.name == "No estan jugando! 😥") {
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Usuario sin juego! <#${channel.id}>`);
    console.log("No hay juego leido!");
  } else if (ch_rename.name !== "No estan jugando! 😥") {
    console.log(`En "${channel.name}" dejaron de jugar!`);
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Dejaron de jugar! <#${channel.id}>`);
    ch_rename.setName("No estan jugando! 😥");
  }
}

// Anterior Object.key
// Object.keys(games).forEach(name_game => {
// 	// games[name_game] = Regresa el valor del juego seleccionado!
// 	if (name_game == typeof 'undefined') {
// 		return;
// 	} else if (games[name_game] > max.val) {
// 		if (name_game != max.game) {
// 			max.game = [name_game];
// 			max.val = games[name_game];
// 		} else if (games[name_game] === max.val) {
// 			if (max.game != name_game) {
// 				max.game = [max.game, name_game];
// 			}
// 		}
// 	}
// });
