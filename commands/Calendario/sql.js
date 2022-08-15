const Sequelize = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("db")
    .setDescription("Testing de base de datos!")
    .addSubcommandGroup((group) =>
      group
        .setName("crea")
        .setDescription("Crea una base de datos!")
        .addStringOption((option) => {
          option
            .setName("nombreTabla")
            .setDescription("Como se llama la tabla?")
            .setRequired(true);
        })
    ),
};

// Haciendo la conexion con la base de datos
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// Creando una tabla en la db
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
const Tags = sequelize.define("BD-Users", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: Sequelize.TEXT,
  username: Sequelize.STRING,
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

// Sincronizando los datos, si no existe entonces la crea o lo puedes forzar con ".sync({force:true})"
Tags.sync();

// Mete una etiqueta de informacion a la tabla
try {
  // equivalente a: INSERT INTO tags (name, description, username) values (?, ?, ?);
  let tag = async () => {
    await Tags.create({
      name: tagName,
      description: tagDescription,
      username: interaction.user.username,
    });
  };

  console.log(`Se creo la etiqueta ${tag.name}`);
} catch (error) {
  if (error.name === "SequelizeUniqueConstraintError") {
    console.log("Ya existe una etiqueta.");
  }

  console.log("Algo salio mal al agregar una etiqueta.");
}

// Ficha una etqueta existente
// equivalente a: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
tag = async () => {
  await Tags.findOne({ where: { name: tagName } });
};

if (tag) {
  // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
  tag.increment("usage_count");
  console.log(tag.get("description"));
} else console.log(`No se encontro la etiqueta: ${tagName}`);

// Editar una etiqueta existente
// equivalent to: UPDATE tags (description) values (?) WHERE name='?';
const affectedRows = async () => {
  await Tags.update(
    { description: tagDescription },
    { where: { name: tagName } }
  );
};

if (affectedRows > 0) {
  console.log(`La etiqueta ${tagName} se edito.`);
} else console.log(`No se encontro la etiqueta: ${tagName}.`);

// Mostrar informacion de una etiqueta
// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
const tag = async () => {
  await Tags.findOne({ where: { name: tagName } });
};

if (tag) {
  console.log(
    `${tagName} se creo por ${tag.username} en la fecha de ${tag.createdAt} y se a usado ${tag.usage_count} veces.`
  );
} else console.log(`Could not find tag: ${tagName}`);

// Muestra todas las etiquetas
// equivalent to: SELECT name FROM tags;
const tagList = async () => {
  await Tags.findAll({ attributes: ["name"] });
};
const tagString =
  tagList.map((t) => t.name).join(", ") || "No especifico una etiqueta.";
console.log(`Lista de etiquetas: ${tagString}`);

// Borrar una etiqueta
// equivalent to: DELETE from tags WHERE name = ?;
const rowCount = async () => {
  await Tags.destroy({ where: { name: tagName } });
};

if (!rowCount) console.log("No existe la etiqueta!");
else console.logy("Etiqueta eliminada!.");
