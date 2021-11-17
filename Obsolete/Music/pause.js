module.exports = {
  name: "pause",
  description: "Pausa la reproduccion",
  category: "Music, Old",
  visible: "Admin, Coder",
  async execute(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply(
        "😐 Debes unirte a un canal de voz para parar la musica!",
      );
    }
    await voiceChannel.leave();
    await message.channel.send("😒 Ahi te quedas, me voy");
  },
};
