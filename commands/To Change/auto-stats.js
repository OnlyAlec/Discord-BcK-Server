const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder(),
  name: "vcStats",
  description: "Muestra las estadisticas del servidor en los vc",
  async execute(BcK) {
    const guild = BcK.guilds.cache.get("821845551921233920");
    const online_Members = guild.members.cache.filter(
      (member) =>
        member.presence.status !== "offline" && member.user.bot == false,
    ).size;
    const prefix = process.env.PREFIX;
    let counter = 0;
    const Channel = {
      miembros: BcK.channels.cache.get("844459937224589312"),
      enlinea: BcK.channels.cache.get("844460191793152010"),
      bots: BcK.channels.cache.get("844460592873078804"),
    };
    // Cada vez que se ejecute que vuelva a definir los contadores, ya despues funciona por eventos de usuario.
    initialstats(guild, Channel, counter, online_Members);

    BcK.on("guildMemberAdd", async (member) => {
      if (member.user.bot == false) {
        counter = CounterBot(guild, counter);
        const allmembers = guild.memberCount - counter;
        Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
      } else {
        counter = CounterBot(guild, counter);
        Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
      }
    });

    BcK.on("guildMemberRemove", async (member) => {
      if (member.user.bot == false) {
        counter = CounterBot(guild, counter);
        const allmembers = guild.memberCount - counter;
        Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
      } else {
        counter = CounterBot(guild, counter);
        Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
      }
    });

    BcK.on("presenceUpdate", async (oldMember, newMember) => {
      if (newMember.user.bot == true) {
        return;
      }
      try {
        // TODOS LOS OFFLINE A ALGUN ESTADO, AGREGA LA CONDICIONAL EN CASO DE QUE SEA UNDEFINED
        const off_to_on =
          oldMember == undefined
            ? (oldMember = {
                status: "offline UnD",
              })
            : oldMember.status === "offline" && newMember.status === "online";
        const off_to_idle =
          oldMember == undefined
            ? (oldMember = {
                status: "offline UnD",
              })
            : oldMember.status === "offline" && newMember.status === "idle";
        const off_to_dnd =
          oldMember == undefined
            ? (oldMember = {
                status: "offline UnD",
              })
            : oldMember.status === "offline" && newMember.status === "dnd";
        // CASO DE ONLINE A OFF, SIEMPRE HAY INFO
        const on_to_off =
          oldMember.status === "online" && newMember.status === "offline";
        const idle_to_off =
          oldMember.status === "idle" && newMember.status === "offline";
        const dnd_to_off =
          oldMember.status === "dnd" && newMember.status === "offline";

        if (off_to_on) {
          console.log(`Offline => Online ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (off_to_idle) {
          console.log(`Offline => Idle ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (off_to_dnd) {
          console.log(`Offline => dnd ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (idle_to_off) {
          console.log(`idle => Offline ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (dnd_to_off) {
          console.log(`dnd => Offline ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        } else if (on_to_off) {
          console.log(`Online => Offline ${online_Members}`);
          Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
        }
      } catch (err) {
        console.log(err);
        BcK.users.cache
          .get("832335604611547186")
          .send(`> Error en modulo: ${prefix}${module.exports.name}`);
        BcK.users.cache.get("832335604611547186").send(` \`\`\`${err}\`\`\``);
      }
    });
  },
};

function initialstats(guild, Channel, counter, online_Members) {
  counter = CounterBot(guild, counter);
  const allmembers = guild.memberCount - counter;
  console.log(`Usuarios en Linea: ${online_Members}\n`);

  Channel.miembros.setName(`👥  ᴍɪᴇᴍʙʀᴏꜱ: ${allmembers}`);
  Channel.enlinea.setName(`🟢 ᴇɴ ʟɪɴᴇᴀ: ${online_Members}`);
  Channel.bots.setName(`🤖 ʙᴏᴛꜱ: ${counter}`);
}

function CounterBot(guild, counter) {
  guild.members.cache.array().forEach((bot) => {
    const isbot = () => {
      let local = 0;
      if (bot.user.bot === true) {
        local++;
        Number(local);
        return local;
      }
    };
    counter = isbot() === undefined ? counter : counter + isbot();
  });
  return counter;
}
