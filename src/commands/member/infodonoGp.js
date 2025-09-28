const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "infodonoGp",
  description: "veja infos do dono do gp",
  commands: ["infodonoGp"],
  usage: `${PREFIX}infodonoG`,

  /**
   * @param {commandsHandlePropros} param0
   */

  handle: async ({ args, socket, remoteJid, sendErrorReply}) => {
    const target = args[0] ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net" : null;

    const infos = getGroupOwner()
    const caption = `*🀄INFOS DO DONO💻* \n ${infos}`

    try {
      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "takeshi-bot.png") },
        caption,
        mentions: [target]
      });

    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Ocorreu um erro ao tentar obter as infos do dono ");
    }
  }
}; 
