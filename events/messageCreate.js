module.exports = {
  name: "messageCreate",
  async execute(message, BcK) {
    try {
      if (!BcK.application?.owner) await BcK.application?.fetch(); // Ficha informacion del dueño del servidor
      if (
        message.content.toLowerCase() === "#*deploy" &&
        message.author.id === BcK.application?.owner.id
      ) {
        // Datos del comando!
        const data = {
          name: "crea comando!",
          description: "Agrega un comando al servidor!",
          options: [
            {
              name: "nombre",
              type: "STRING",
              description: "Nombre del comando",
              required: true,
            },
            {
              name: "descripcion",
              type: "STRING",
              description: "Descripcion del comando!",
              required: true,
            },
          ],
        };
        // Const row = new MessageActionRow()
        // .addComponents(
        // 	new MessageButton()
        // 		.setCustomId('perm')
        // 		.setLabel('Agregar permisos de comando!')
        // 		.setStyle('PRIMARY'),
        // );
        const command = await BcK.guilds.cache
          .get("821845551921233920")
          ?.commands.create(data);
        console.log(command);
        // Await message.reply({ content: 'Comando creado!', components: [row] });
        message.reply("Comando manual creado!");
      } else if (
        message.content.toLowerCase() === "#*remove_all" &&
        message.author.id === BcK.application?.owner.id
      ) {
        // Elimina todos los comandos del servidor!
        const command = await BcK.guilds.cache
          .get("821845551921233920")
          ?.commands.set([]);
        console.log(command);
        message.reply("TODOS los comandos eliminado!");
      } else if (
        message.content.toLowerCase() === "#*remove" &&
        message.author.id === BcK.application?.owner.id
      ) {
        // Elimina un solo comando, saca el ID con fetch!
        await BcK.guilds.cache
          .get("821845551921233920")
          ?.commands.delete("875391703966695517");
        message.reply("Comando eliminado!");
      } else if (
        message.content.toLowerCase() === "#*fetch" &&
        message.author.id === BcK.application?.owner.id
      ) {
        // Ficha todos los comandos del servidor!
        const commands = await BcK.guilds.cache
          .get("821845551921233920")
          ?.commands.fetch();
        console.log(`Fetched ${commands.size} commands`);
        commands.map((cmd) => console.log(cmd));
        message.reply("Comandos Fichados!");
      } else if (
        message.content.toLowerCase() === "#*deploy" &&
        !message.author.id === !BcK.application?.owner.id
      ) {
        message.reply(
          "Asi te queria agarrar puerco! No eres el dueño del server... :face_with_raised_eyebrow:",
        );
      }
    } catch (error) {
      console.log(error);
      message.reply(`${error.message} ${error.code}`);
    }
  },
};
