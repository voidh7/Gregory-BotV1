const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "comer",
  description: "cmd para comer seu amigo (a)",
  commands: ["comer", "sexo"],
  usage: `${PREFIX}comer @user`,

  handle: async ({
    args,
    socket,
    remoteJid,
    userJid,
    sendErrorReply,
    sendSuccessReact,
  }) => {
    try {
      // detecta targetJid (primeiro argumento ou o próprio userJid)
      const targetJid = args[0]
        ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net"
        : null;

      if (!targetJid) {
        return sendErrorReply(
          "Você precisa mencionar alguém para comer 😈 Exemplo: " + this.usage
        );
      }

      const mentions = [targetJid];
      const caption = `😈 Você acaba de comer o @${targetJid.split("@")[0]}`;

      // manda reação de sucesso
      await sendSuccessReact();

      // envia imagem + legenda + menção
      await socket.sendMessage(remoteJid, {
        image: { url: path.join(ASSETS_DIR, "images", "comer.jpg") },
        caption,
        mentions,
      });
    } catch (error) {
      console.error("Erro no comando comer:", error);
      await sendErrorReply("Erro ao executar o comando comer.");
    }
  },
};