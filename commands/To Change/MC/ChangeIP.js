const fs = require("fs");

module.exports = {
  name: "changeip",
  description: "Cambia la IP del servidor de MC",
  args: true,
  // IPF: () => {
  // 	return module.exports.IPF;
  // },
  execute(message, args) {
    const IPgiven = args[0];

    if (!args[0]) {
      message.reply("Falta *args*");
    } else {
      const ValIP = ValidateIPaddress(message, IPgiven);

      if (ValIP == true) {
        fs.readFile("./commands/MC/mcIP.txt", (err, data) => {
          if (err) throw err;
          if (data != IPgiven) {
            fs.writeFile("./commands/MC/mcIP.txt", IPgiven, (err) => {
              if (err) throw err;
            });
            message.reply(` Se cambio la direccion a : "${IPgiven}"`);
          } else {
            message.reply(" Es misma IP... ");
          }
        });

        // Module.exports = { IPF: IPgiven };
        // exports.IPF = IPgiven;
      }
    }
  },
};

function ValidateIPaddress(message, IPC) {
  const ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (IPC.match(ipformat)) {
    return true;
  } else {
    message.reply("***Invalid IP address!***");
    return false;
  }
}
