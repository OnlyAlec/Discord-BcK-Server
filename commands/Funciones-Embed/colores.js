const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roles_colores",
  description: "Se asiga el color elgido como rol",
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      console.log("%cā¢\t Colores ", "background: #CE796B; color: white");
      let color_New, color_Old;
      const color = interaction.customId.split(": ")[1];
      const statusRol = check_Rol(interaction);
      if (statusRol.exist == true)
        color_Old = await remove_Rol(statusRol.role, interaction);
      switch (color) {
        case "š„": {
          color_New = await set_rol("Rojo", interaction);
          break;
        }
        case "š§": {
          color_New = await set_rol("Naranja", interaction);
          break;
        }
        case "šØ": {
          color_New = await set_rol("Amarillo", interaction);
          break;
        }
        case "š©": {
          color_New = await set_rol("Verde", interaction);
          break;
        }
        case "šµ": {
          color_New = await set_rol("Cian", interaction);
          break;
        }
        case "š¦": {
          color_New = await set_rol("Azul", interaction);
          break;
        }
        case "šŖ": {
          color_New = await set_rol("Morado", interaction);
          break;
        }
        case "šø": {
          color_New = await set_rol("Rosa", interaction);
          break;
        }
        case "š«": {
          color_New = await set_rol("Cafe", interaction);
          break;
        }
        case "ā¬": {
          color_New = await set_rol("Blanco", interaction);
          break;
        }

        default:
          console.log(
            "%cā¢\t Error color no existente " + color,
            "background: #CE796B; color: white"
          );
          break;
      }
      embeds(interaction, color_Old, color_New);
    } catch (error) {
      console.log(error);
    }
  },
};

function check_Rol(interaccion) {
  // Debo de checar si ya tiene un color puesto
  // En caso de que si y sea el mismo color pues no hacer nada
  // De lo contrario si es otro color, quitar el rol que tiene y poner el nuevo
  const user = interaccion.member;
  let band = false;
  let role_Exist;
  user.roles.cache.forEach((role) => {
    if (role.name.includes("<") && band === false) {
      band = true;
      role_Exist = role;
    }
  });
  const status = { exist: band, role: role_Exist };
  return status;
}

async function remove_Rol(rol, interaction) {
  let error = false;
  const user = interaction.member;
  await user.roles
    .remove(rol)
    .catch(error)
    .then(() => {
      if (!error) {
        console.log(
          "%cā¢\t Se quito rol: " + rol.name,
          "background: #CE796B; color: white"
        );
      } else return error;
    });
  return rol.name;
}

async function set_rol(color, interaction) {
  let error = false;
  const user = interaction.member;
  const roles = await interaction.guild.roles.fetch();
  const user_Rol = roles.find(
    (color_rol) => color_rol.name === "< " + color + " >"
  );
  await user.roles
    .add(user_Rol)
    .catch(error)
    .then(() => {
      if (!error) {
        console.log(
          "%cā¢\t Rol asignado: " + user_Rol.name,
          "background: #CE796B; color: white"
        );
      } else return error;
    });
  return user_Rol.name;
}

async function embeds(interaction, color_Old, color_New) {
  const emoji_Old = emoji(color_Old);
  const emoji_New = interaction.customId.split(" : ")[1];
  const correct = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("ĖāĀ°ā¢.ĖāĀ°ā¢ ššššššš šš¶šš¶ ššš¹šš ! ā¢Ā°āĖ.ā¢Ā°āĖ")
    .setAuthor({
      name: "BeckS - Server",
      iconURL: "https://i.imgur.com/9mMUVDh.png",
      url: "https://github.com/OnlyAlec/Discord-BcK-Server",
    })
    .addField("Tu nuevo color ahora es: ", `${color_New}   ${emoji_New}`, true);

  const change = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("ĖāĀ°ā¢.ĖāĀ°ā¢ ššššššš šš¶šš¶ ššš¹šš ! ā¢Ā°āĖ.ā¢Ā°āĖ")
    .setAuthor({
      name: "BeckS - Server",
      iconURL: "https://i.imgur.com/9mMUVDh.png",
      url: "https://github.com/OnlyAlec/Discord-BcK-Server",
    })
    .addFields(
      {
        name: "Anterior Color               ->",
        value: `${color_Old}   ${emoji_Old}`,
        inline: true,
      },
      {
        name: "Nuevo Color",
        value: `${color_New}   ${emoji_New}`,
        inline: true,
      }
    );

  if (color_Old) {
    await interaction.editReply({
      embeds: [change],
      ephemeral: true,
    });
  } else {
    await interaction.editReply({
      embeds: [correct],
      ephemeral: true,
    });
  }
}

function emoji(color) {
  if (!color) return;
  color = color.split(" ")[1];
  switch (color) {
    case "Rojo":
      return "š„";
      break;
    case "Naranja":
      return "š§";
      break;
    case "Amarillo":
      return "šØ";
      break;
    case "Verde":
      return "š©";
      break;
    case "Cian":
      return "šµ";
      break;
    case "Azul":
      return "š¦";
      break;
    case "Morado":
      return "šŖ";
      break;
    case "Rosa":
      return "šø";
      break;
    case "Cafe":
      return "š«";
      break;
    case "Blanco":
      return "ā¬";
      break;
    default:
      return null;
      break;
  }
}
