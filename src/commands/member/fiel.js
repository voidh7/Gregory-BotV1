const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "fiel",
  description: "veja o quando seu amigo e fiel",
  commands: ["fiel"],
  usage: `${PREFIX}fiel`,

  /**
   * @param {commandsHandlePropros} param0
   */

  handle: async ({ args, socket, remoteJid, sendErrorReply}) => {
    const target = args[0] ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net" : null;

    if (!target) {
      return sendErrorReply(`🙃Você precisa marcar alguém`);
    }

    let random = Math.floor(Math.random() * 101);
    const caption = `🫀 seu amigon e  ${random}% fiel @${target.split("@")[0]}`;

    try {
      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "fiel.jpg") },
        caption,
        mentions: [target]
      });

    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Ocorreu um erro ao tentar medir o petismo do seu amigo       ");
    }
  }
}; 
