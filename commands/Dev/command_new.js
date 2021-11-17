// TODO: Si ya hay un comando con el mismo nombre entonces mandar warning!
// TODO: Configurar el añadir permisos o eliminar los permisos de un usuario/rol

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("command")
    .setDescription("Añade un comando al servidor!")
    .addStringOption((option) =>
      option
        .setName("nombre")
        .setDescription("Nombre del comando!")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("descripcion")
        .setDescription("Descripcion del comando!")
        .setRequired(true),
    ),
  once: true,
  async execute(interaction, BcK) {
    if (interaction.isButton()) {
      await SubCommands(interaction, BcK);
      return;
    }
    if (!BcK.application?.owner) await BcK.application?.fetch();
    if (
      interaction.user.id === BcK.application?.owner.id ||
      interaction.member._roles.find((m) => m == "829279249273716777")
    ) {
      const options = {
        command: interaction.options?.data[0].value,
        description: interaction.options?.data[1].value,
      };
      const data = {
        name: `${options.command}`,
        description: `${options.description}`,
      };
      const command = await BcK.guilds.cache
        .get(interaction.guildId)
        ?.commands.create(data);

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${this.name} : ${command.id} #`)
          .setLabel("Edita los permisos de este comando!")
          .setStyle("PRIMARY"),
      );
      await interaction.reply({
        content: `Comando creado! ID: ${command.id}`,
        components: [row],
      });
      console.log(command);
    } else {
      interaction.reply(
        "Necesitas tener el rol de <@&829279249273716777> para poder crear comandos!",
      );
    }
  },
};

async function SubCommands(interaction, BcK) {
  try {
    await interaction.deferReply();
    const guild = BcK.guilds.cache.get(interaction.guildId);

    const cmdID = /(?<=:)(.*?)(?=#)/
      .exec(interaction.customId)?.[0]
      .toString()
      .trim(); // /([^: ]*)$/.exec(interaction.customId)?.[0].toString() Solo los :
    const cmdExecute = /.+?(?= :)/.exec(interaction.customId)?.[0].toString();
    const cmdFetch = await guild?.commands.fetch(cmdID);

    if (interaction.customId.includes("perm_role")) {
      // Permisos ROLES
      if (interaction.customId.includes("add_role")) {
        console.log("Agregar permisos para role");
      } else if (interaction.customId.includes("del_role")) {
        console.log("Eliminar permisos para role");
      } else {
        // Default embed de roles
        const row = new MessageActionRow();
        if (cmdFetch.defaultPermission == true) {
          row.addComponents(
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_role $ del_role`)
              .setLabel("Quitar permiso!")
              .setStyle("DANGER"),
          );
        } else {
          row.addComponents(
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_role $ add_role`)
              .setLabel("Agregar permiso!")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_role $ del_role`)
              .setLabel("Quitar permiso!")
              .setStyle("DANGER"),
          );
        }
        const roles_embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Roles que pueden usar el comando:")
          .setAuthor(`Estas nodificando el comando: > ${cmdFetch.name} <`)
          .setThumbnail(
            "https://img.icons8.com/color/48/000000/key-security.png",
          )
          .setTimestamp()
          .setFooter(
            "Edita los permisos del comando que creaste!",
            BcK.user.avatarURL(),
          );

        guild.roles.cache.forEach((role) => {
          roles_embed.addFields({
            name: `${role.name}`,
            value: `Personas con el role: **${role.members.size}**`,
            inline: true,
          });
        });
        await interaction.editReply({
          components: [row],
          embeds: [roles_embed],
        });
      }
    } else if (interaction.customId.includes("perm_user")) {
      // Permisos USUARIOS
      if (interaction.customId.includes("add_user")) {
        console.log("Agregar Usuario!");
      } else if (interaction.customId.includes("del_user")) {
        console.log("Eliminar Usuario!");
      } else {
        const row = new MessageActionRow();
        if (cmdFetch.defaultPermission == true) {
          row.addComponents(
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_user $ del_user`)
              .setLabel("Quitar a un usuario!")
              .setStyle("DANGER"),
          );
        } else {
          row.addComponents(
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_user $ add_user`)
              .setLabel("Agregar un usuario!")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId(`${cmdExecute} : ${cmdID} # perm_user $ del_user`)
              .setLabel("Quitar a un usuario!")
              .setStyle("DANGER"),
          );
        }
        const user_embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Todas las personas del server pueden usar el comando:")
          .setAuthor(`Estas nodificando el comando: > ${cmdFetch.name} <`)
          .setThumbnail(
            "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/2x/external-person-infographic-elements-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png",
          )
          .setTimestamp()
          .setFooter(
            "Edita los permisos del comando que creaste!",
            BcK.user.avatarURL(),
          );

        await interaction.editReply({
          components: [row],
          embeds: [user_embed],
        });
      }
    } else {
      // EMBED POR DEFECTO
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${cmdExecute} : ${cmdID} # perm_role`)
          .setLabel("Agregar permiso a un role!")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId(`${cmdExecute} : ${cmdID} # perm_user`)
          .setLabel("Agregar permiso a un usuario especifico!")
          .setStyle("SECONDARY"),
      );
      await interaction.editReply({
        content: "Que quieres hacer, patron?",
        components: [row],
      });
    }
  } catch (error) {
    console.error();
    interaction.editReply(error);
  }
}
