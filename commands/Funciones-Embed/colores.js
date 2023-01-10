const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roles_colores",
  description: "Se asiga el color elgido como rol",
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      console.log("%c⇢\t Colores ", "background: #CE796B; color: white");
      let color_New, color_Old;
      const color = interaction.customId.split(": ")[1];
      const statusRol = check_Rol(interaction);
      if (statusRol.exist == true)
        color_Old = await remove_Rol(statusRol.role, interaction);
      switch (color) {
        case "🟥": {
          color_New = await set_rol("Rojo", interaction);
          break;
        }
        case "🟧": {
          color_New = await set_rol("Naranja", interaction);
          break;
        }
        case "🟨": {
          color_New = await set_rol("Amarillo", interaction);
          break;
        }
        case "🟩": {
          color_New = await set_rol("Verde", interaction);
          break;
        }
        case "🔵": {
          color_New = await set_rol("Cian", interaction);
          break;
        }
        case "🟦": {
          color_New = await set_rol("Azul", interaction);
          break;
        }
        case "🟪": {
          color_New = await set_rol("Morado", interaction);
          break;
        }
        case "🌸": {
          color_New = await set_rol("Rosa", interaction);
          break;
        }
        case "🟫": {
          color_New = await set_rol("Cafe", interaction);
          break;
        }
        case "⬜": {
          color_New = await set_rol("Blanco", interaction);
          break;
        }

        default:
          console.log(
            "%c⇢\t Error color no existente " + color,
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
          "%c⇢\t Se quito rol: " + rol.name,
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
          "%c⇢\t Rol asignado: " + user_Rol.name,
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
    .setTitle("˜”°•.˜”°• 𝒞𝑜𝓁𝑜𝓇𝑒𝓈 𝓅𝒶𝓇𝒶 𝓉𝑜𝒹𝑜𝓈 ! •°”˜.•°”˜")
    .setAuthor({
      name: "BeckS - Server",
      iconURL: "https://i.imgur.com/9mMUVDh.png",
      url: "https://github.com/OnlyAlec/Discord-BcK-Server",
    })
    .addFields({
      name: "Tu nuevo color ahora es: ",
      value: `${color_New}   ${emoji_New}`,
      inline: true,
    });

  const change = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("˜”°•.˜”°• 𝒞𝑜𝓁𝑜𝓇𝑒𝓈 𝓅𝒶𝓇𝒶 𝓉𝑜𝒹𝑜𝓈 ! •°”˜.•°”˜")
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
      return "🟥";
      break;
    case "Naranja":
      return "🟧";
      break;
    case "Amarillo":
      return "🟨";
      break;
    case "Verde":
      return "🟩";
      break;
    case "Cian":
      return "🔵";
      break;
    case "Azul":
      return "🟦";
      break;
    case "Morado":
      return "🟪";
      break;
    case "Rosa":
      return "🌸";
      break;
    case "Cafe":
      return "🟫";
      break;
    case "Blanco":
      return "⬜";
      break;
    default:
      return null;
      break;
  }
}
