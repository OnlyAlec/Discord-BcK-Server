module.exports = {
  name: "ready",
  once: true,
  async execute(BcK) {
    const nowmoment = Intl.DateTimeFormat("es-MX", {
      timeStyle: "long",
    }).format(Date.now());
    console.log(
      `%cSesion iniciada como ${BcK.user.tag}! ${nowmoment}`,
      "background: teal; color: white\n"
    );
    // Comandos a ejecutar
    await require("../utils/deploy.js").execute();
    await sleep(2500);
    auto_commands();

    BcK.user.setActivity("tus peticiones...", {
      type: "LISTENING",
    });

    BcK.channels.cache
      .get("832335604611547186")
      .send(`> MAIN - Bot Encendido || ${nowmoment}`);

    function auto_commands() {
      BcK.auto_commands.forEach((command) => command.execute(BcK));
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  },
};
