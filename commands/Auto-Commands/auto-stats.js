module.exports = {
  name: "auto-stats",
  description: "Muestra las estadisticas del servidor en los vc",
  execute(BcK) {
    let counter = 0;

    const guild = BcK.guilds.cache.get("821845551921233920");
    let online_Members = guild.members.cache.filter(
      (member) => member.presence !== null && member.user.bot === false,
    ).size;
    const Channel = {
      miembros: BcK.channels.cache.get("844459937224589312"),
      enlinea: BcK.channels.cache.get("844460191793152010"),
      bots: BcK.channels.cache.get("844460592873078804"),
    };
    // Cada vez que se ejecute que vuelva a definir los contadores, ya despues funciona por eventos de usuario.
    initialstats(guild, Channel, counter, online_Members);

    BcK.on("guildMemberAdd", (member) => {
      if (member.user.bot === false) {
        counter = CounterBot(guild, counter);
        const allmembers = guild.memberCount - counter;
        Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
      } else {
        counter = CounterBot(guild, counter);
        Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
      }
    });

    BcK.on("guildMemberRemove", (member) => {
      if (member.user.bot === false) {
        counter = CounterBot(guild, counter);
        const allmembers = guild.memberCount - counter;
        Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
      } else {
        counter = CounterBot(guild, counter);
        Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
      }
    });

    BcK.on("presenceUpdate", (oldMember, newMember) => {
      // Anterior metodo para sacar los enlinea!
      // online_Members = (await guild.members.fetch()).filter(
      //   (member) => !member.user.bot && member.presence?.status !== null,
      // ).size;
      // if (oldMember?.status === newMember.status) return;

      if (!newMember.user.bot && newMember.status !== oldMember?.status) {
        // Offline => Online(Online || Idle || DnD)
        if (
          oldMember
            ? oldMember.status === "offline"
            : true && newMember.status !== "offline"
        ) {
          console.log(
            `\n%cOffline => Online`,
            "background: #59667A; color: white",
          );
          console.log(
            `%cUsuarios en Linea: ${online_Members} `,
            "background: #4682B4; color: white",
          );
          online_Members++;
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (
          // Online(Online || Idle || DnD) => Offline
          oldMember.status !== "offline" &&
          newMember.status === "offline"
        ) {
          console.log(
            `\n%cOnline => Offline`,
            "background: #59667A; color: white",
          );
          console.log(
            `%cUsuarios en Linea: ${online_Members} `,
            "background: #4682B4; color: white",
          );
          online_Members--;
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        }
      }
    });
  },
};

function initialstats(guild, Channel, counter, online_Members) {
  counter = CounterBot(guild, counter);
  const allmembers = guild.memberCount - counter;

  console.log(
    `%cStart!\t%cUsuarios en Linea: ${online_Members}  \n`,
    "background: #1c3728; color: white",
    "background: #4682B4; color: white",
  );

  Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
  Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
  Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
}

function CounterBot(guild, counter) {
  guild.members.cache.forEach((bot) => {
    let local = 0;
    if (bot.user.bot === true) {
      local++;
    }
    counter += local;
  });
  return counter;
}
