/* eslint-disable no-useless-escape */
// npm install @discordjs/opus ffmpeg-static yt-search ytdl-core
// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');
// const ytpl = require('ytpl');

module.exports = {
  name: "play",
  description: "Reproduccion de cancion/ playlist",
  category: "Music, Old",
  visible: "Admin, Coder",
  async execute(message, args) {
    // VARIABLES
    const voiceChannel = message.member.voice.channel;
    let song;

    if (!voiceChannel) {
      return message.channel.send(
        "¡Necesitas unirte a un canal de voz para reproducir música!",
      );
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "¡Necesito permisos para unirme y hablar en el canal de voz!",
      );
    }
    if (!args.length) return message.reply("¡Ocupo el nombre de la cancion/playlist!");

    // Musica URL
    if (ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getBasicInfo(args[0]);
      const connection = await voiceChannel.join();
      const Stream = ytdl(args[0], { filter: "audioonly" });

      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };

      connection.play(Stream, { seek: 0, volume: 1 }).on("finish", () => {
        message.channel.send("👋 Cancion terminada, me voy");
        voiceChannel.leave();
      });
      await message.channel.send(`🎈 Reproducciendo: ***${song.title}***`);
      return;
    }

    // Musica titulo
    const connection = await voiceChannel.join();
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(" "));
    if (video) {
      const Stream = ytdl(video.url, { filter: "audioonly" });
      connection.play(Stream, { seek: 0, volume: 1 }).on("Finish", () => {
        message.channel.send("👋 Cancion terminada, me voy :3");
        voiceChannel.leave();
      });
      await message.channel.send(`🎈 Reproducciendo: ***${video.title}***`);
    } else {
      message.reply("😟 No encontre resultados!");
    }
  },
};
