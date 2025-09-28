const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "voadora",
  description: "Dê uma voadora no seu amigo(a)", 
  commands: ["voadora"],
  usage: `${PREFIX}voadora`,

  /**
   * @param {commandsHandlePropros} param0
   */
  handle: async ({ args, socket, remoteJid, sendErrorReply, sendSucessReact }) => {
    const target = args[0] ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net" : null;
    
    if (!target) {
      return sendErrorReply(`😈 Você precisa marcar alguém para dar uma voadora!\nExemplo: ${module.exports.usage}`);
    }

    const mentions = [target];
    const caption = `💥 Você acaba de dar uma voadora no @${target.split("@")[0]}`;

    try {
      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "voadora.jpg") },
        caption,
        mentions
      });
      sendSucessReact("💥");
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Ocorreu um erro ao tentar enviar a voadora.");
    }
  }
};