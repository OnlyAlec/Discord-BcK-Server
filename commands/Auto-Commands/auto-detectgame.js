module.exports = {
  name: "auto-detectgame",
  description:
    "Detecta que juego esta juganado y renombra el canal de [ Random ]",
  execute(BcK) {
    const id_ch_random = "833915268942135326"; // ID canal que se conectan

    try {
      const ch_random = BcK.channels.cache.get("833915268942135326");
      if (ch_random.members.size >= 1) {
        calculateGame(ch_random, BcK);
      } else {
        BcK.channels.cache
          .get("834220871177994250")
          .setName("No estan jugando! 😥");
      }
    } catch (err) {
      console.log(err);
      BcK.channels.cache.get("832335604611547186").send(`>>> ${err}`);
    }

    BcK.on("voiceStateUpdate", (oldMember, newMember) => {
      if (!(newMember.member.user.bot === true)) {
        try {
          const oldChannel = oldMember.channel;
          const newChannel = newMember.channel;

          // Primera vez conectado a ch! *oldChannel = null*
          if (oldChannel === null && newChannel) {
            if (newChannel.id !== id_ch_random) {
              return;
            } else if (newChannel.id === id_ch_random) {
              // Console.log("Primera vez que se conecta a [ Random ]");
              const channel = newMember.channel;
              calculateGame(channel, BcK);
            }
          } else if (newChannel === null && oldChannel) {
            // Cuando se desconecta de ch! *newChannel = null*
            if (oldChannel.id !== id_ch_random) {
              return;
            } else if (oldChannel.id === id_ch_random) {
              // Console.log("Se desconecto de [ Random ]");
              const channel = oldMember.channel;
              calculateGame(channel, BcK);
            }
          } else if (
            // Cuanso se mueve de Random a otro canal! (Desconectado de [Random])
            oldChannel.id === id_ch_random &&
            newChannel.id !== id_ch_random
          ) {
            // Console.log("Se desconecto de [ Random ]");
            const channel = oldMember.channel;
            calculateGame(channel, BcK);
          } else if (
            // Se movio de otro canal a Random! *oldChannel !=(Diferente a) Random && newChannel == Random*
            oldChannel.id !== id_ch_random &&
            newChannel.id === id_ch_random
          ) {
            // Console.log("Se movio a [ Random ]");
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
      if (
        !newMember.user.bot &&
        newMember.member.voice.channelId === id_ch_random
      ) {
        const oldGame = oldMember?.activities?.find(
          (act) => act.type === "PLAYING",
        )?.name;
        const newGame = newMember?.activities?.find(
          (act) => act.type === "PLAYING",
        )?.name;

        if (oldGame !== newGame) {
          calculateGame(newMember.member.voice.channel, BcK);
        }
      }
    });
  },
};

function calculateGame(channel, BcK) {
  console.log("%c⇢\tAuto-DetectGame ", "background: #CE796B; color: white");
  const games = {};
  const max = {
    game: [],
  };
  const members_in_channel = channel.members;
  const ch_rename = BcK.channels.cache.get("834220871177994250"); // Canal que se cambia de nombre

  // Por cada miembro, detecte que juego esta y hacer un array(lista) agregando el juego y la sumando la persona
  // Si el juego ya esta entonces agrega un contador al juego.

  // eslint-disable-next-line array-callback-return
  members_in_channel.map((member) => {
    if (member.presence?.activities.length >= 1) {
      const userGame = member.presence?.activities.find(
        (activity) => activity.type === "PLAYING",
      );
      if (userGame !== undefined && !(userGame in games)) {
        games[userGame] = 1;
      } else if (userGame !== undefined) {
        games[userGame]++;
      }
    }
  });

  Object.keys(games).forEach((name_game) => {
    // Games[name_game] = Regresa la cantidad de gente en el juego seleccionado!
    if (name_game !== max.games) {
      max.game.push(name_game);
    }
  });

  if (max.game.length === 1) {
    console.log(
      `\t%c"${channel.name}" ahora juega "${max.game}"\n`,
      "background: #CE796B; color: white",
    );
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> <#${channel.id}> ahora juega "${max.game}"`);
    ch_rename.setName(`"${max.game[0]}"`);
  } else if (max.game.length >= 2) {
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Multiples juegos! <#${channel.id}> \n\tJuegos: ${max.game}\n`);
    console.log(
      `\t%cEn "${channel.name}" hay varios juegos! \n%c\t%cJuegos: ${max.game}\n`,
      "background: #CE796B; color: white",
      "",
      "background: #CE796B; color: white",
    );
    ch_rename.setName("Varios juegos! 🕹");
  } else if (ch_rename.name === "No estan jugando! 😥") {
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Usuario sin juego! <#${channel.id}>`);
    console.log(
      "\t%cNo hay juego leido!\n",
      "background: #CE796B; color: white",
    );
  } else if (ch_rename.name !== "No estan jugando! 😥") {
    console.log(
      `\t%cEn "${channel.name}" dejaron de jugar!\n`,
      "background: #CE796B; color: white",
    );
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
