// FIXME: Anotar el ID del canal al que se movio, cuando se encicle comparar este ID si es el mismo entonces no hacer nada
// FIXME: Si se desconecta usuario que recompruebe que usuraios estan en el canal y catalogarlos.
// FIXME: Si el usuario esta en canal de musica o afk no hacer nada

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder(),
  name: "move_user_vc",
  description: "Mueve automaticamente a los miembros al ch del juego!",
  category: "auto",
  visible: "Admin",
  execute(BcK) {
    let IDch_moved = "";
    // Cuando alquien entre y salga del canal de voz!
    BcK.on("voiceStateUpdate", (oldMember, newMember) => {
      if (newMember.member.user.bot == true) {
        return;
      }
      // Excepcion de canales
      if (newMember.channelID == "823970109865197630") {
        return;
      } // Pura musica #1
      if (newMember.channelID == "853764289142587403") {
        return;
      } // Pura musica #2
      if (newMember.channelID == "823965821654532096") {
        return;
      } // AFK
      // Fin

      if (newMember.channelID) {
        // Se conecto o desconecto?
        if (newMember.channelID == oldMember.channelID) {
          // Si el canal que se conecto es el mismo en el que estaba, nada!
          return;
        }
        if (newMember.channelID == IDch_moved) {
          // Si el ID del canal nuevo es el mismo al canal movido, nada!
          IDch_moved = "";
        } else {
          IDch_moved = main(newMember.channel);
        }
      } else if (oldMember.channel.members.size >= 1) {
        // Si se desconecto y hay miembros en el canal
        IDch_moved = main(oldMember.channel);
      }
    });

    // Cuando se cambie la presencia de un usuraio!
    BcK.on("presenceUpdate", (oldMember, newMember) => {
      const newVoice_member = newMember.member.voice;
      const oldMember_act = oldMember ? oldMember.activities : [];
      const oldGame = oldMember_act.find(
        (activity) => activity.type === "PLAYING",
      )
        ? oldGame.find((activity) => activity.type === "PLAYING").name
        : null;
      const newGame = newMember.activities.find(
        (activity) => activity.type === "PLAYING",
      )
        ? newMember.activities.find((activity) => activity.type === "PLAYING")
            .name
        : null;

      if (newMember.user.bot == true) {
      } else if (newVoice_member.channelID != null) {
        // Si esta conectado a un canal, entra!
        if (oldGame !== newGame) {
          // Si el  juego anterior no es el mismo que el nuevo
          IDch_moved = main(newVoice_member.channel);
        }
      }
    });

    // Funciones
    function main(channel) {
      // Contador de miembros + juegos
      let counter = 0;
      let ch_to_move = "";
      const games_users = {};

      channel.members.map((cmd) => {
        const user_game = cmd.user.presence.activities.find(
          (activity) => activity.type === "PLAYING",
        );
        if (cmd.user.bot != true) {
          counter++;
        }
        if (user_game !== undefined && !(user_game in games_users)) {
          games_users[user_game.name] = 1;
        } else if (user_game !== undefined) {
          games_users[user_game.name]++;
        }
      });

      // Verificador de counter y Juegos
      let result;
      if (Object.keys(games_users).length >= 2) {
        // Si hay mas de 2 juegos, no hagas nada
        result = false;
      } else if (Object.keys(games_users).length == 0) {
        // Si no hay juegos, moverlos a 'De chill'
        channel.members.map((member) => {
          member.voice.setChannel("824656947227656202", "Auto-Move");
        });
      } else {
        // Solo hay un juego
        Object.keys(games_users).forEach((name_game) => {
          if (counter == games_users[name_game]) {
            // Si el # de personas jugando son las mismas que las del vc entonces true!
            result = true;
          } else {
            result = false;
          }
        });
      }

      // Se mueven?
      if (result == false || result == undefined) {
        return;
      } else {
        // A que canal?
        Object.keys(games_users).forEach((name_game) => {
          if (name_game == "VALORANT") {
            // Comprobacion de rol
            const teamBcK = channel.guild.roles.cache.find(
              (role) => role.name === "{ TeamBcK }",
            );
            channel.members.map((cmd) => {
              if (cmd._roles.find((id) => id === teamBcK.id)) {
                ch_to_move = "823616154697203742"; // Vamo` a jugar
              } else {
                ch_to_move = "823632881145741322"; // Random Squad
              }
            });
          } else if (name_game == "Minecraft") {
            ch_to_move = "823632331860213811";
          } else if (name_game == "Fortnite") {
            ch_to_move = "823647675001864204";
          } else if (name_game == "Visual Studio Code") {
            ch_to_move = "829160080800481362";
          } else {
            ch_to_move = "833915268942135326"; // Random Game
          }
        });
        // Mover a los miembros
        channel.members.map((member) => {
          member.voice.setChannel(ch_to_move);
        });
      }
      return ch_to_move;
    }

    // Function noloop(oldChannel) {
    // 	fs.writeFile('./commands/Auto/InTest/oldChID.txt', oldChannel.id, (err) => {
    // 		if (err) throw err;
    // 	});
    // }
  },
};
