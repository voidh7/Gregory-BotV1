const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "pedir-namoro",
  description: "Peça seu namorado(a) em namoro pelo nosso bot",
  commands: ["pedir-namoro"],
  usage: `${PREFIX}pedir-namoro`,

  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    args,
    socket,
    remoteJid,
    sendErrorReply,
    sendSuccessReact,
  }) => {
    try {
      const targetJid = args[0]
        ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net"
        : null;

      if (!targetJid) {
        return sendErrorReply(
          `😘 Oi, você precisa mencionar alguém para pedir em namoro.\nExemplo: ${module.exports.usage}`
        );
      }

      const mentions = [targetJid];
      const caption = `💘 Você acaba de pedir em namoro o(a) @${targetJid.split("@")[0]}`;

      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "pedir-namoro.jpg") },
        caption,
        mentions,
      });

      sendSuccessReact("💘");
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao enviar o pedido de namoro.");
    }
  },
};

