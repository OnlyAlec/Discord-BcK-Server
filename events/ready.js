module.exports = {
  name: "ready",
  once: true,
  async execute(BcK) {
    const nowmoment = Intl.DateTimeFormat("es-MX", {
      timeStyle: "long",
    }).format(Date.now());

    console.log(
      `%cSesion iniciada como ${BcK.user.tag}! ${nowmoment}`,
      "background: teal; color: white\n",
    );
    BcK.user.setActivity("Codificando...", {
      type: "PLAYING",
    });
    await require("../utils/deploy.js").execute();
    BcK.channels.cache
      .get("832335604611547186")
      .send(`> Beta - Bot Encendido ${nowmoment}`);
  },
};
