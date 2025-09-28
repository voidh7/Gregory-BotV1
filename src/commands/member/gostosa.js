const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "gostosa",
  description: "😈 veja o quanto sua amiga é gostosa",
  commands: ["gostosa"],
  usage: `${PREFIX}gostosa`,

  /**
   * @param {commandsHandlePropros} param0
   */
  handle: async ({ args, socket, remoteJid, sendErrorReply}) => {
    const target = args[0] ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net" : null;

    if (!target) {
      return sendErrorReply(`😈 Você precisa marcar alguém`);
    }

    let random = Math.floor(Math.random() * 101);
    const caption = `😻 sua amiga é ${random}% gostosa @${target.split("@")[0]}`;

    try {
      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "gostosa.jpg") },
        caption,
        mentions: [target]
      });
      
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Ocorreu um erro ao tentar medir a gostosura da sua amiga");
    }
  }
};
