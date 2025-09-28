const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX, OWNER_JID } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "div",
  description: "Envia um Pedido a Desconhecido no grupo atual",
  commands: ["div"],
  usage: `${PREFIX}div <mensagem>`,
  handle: async ({
    socket,
    sendReact,
    sendReply,
    sendErrorReply,
    args,
    sender,
    from, // grupo onde o comando foi usado
  }) => {
    try {
      // Apenas dono pode usar
      if (sender !== OWNER_JID) {
        return sendErrorReply("❌ Apenas o supremo mestre voidh7 pode usar esse comando");
      }

      if (!args.length) {
        return sendErrorReply(`Uso: ${PREFIX}div <mensagem>`);
      }

      const pedidoMsg = args.join(" ");
      const metadata = await socket.groupMetadata(from);
      const members = metadata.participants.map(p => p.id);

      await socket.sendMessage(from, {
        text: `!totag ${pedidoMsg}`,
        mentions: members,
        contextInfo: {
          externalAdReply: {
            title: "XXX 1",
            body: "Pedido a Desconhecido",
            mediaType: 1,
            renderLargerThumbnail: false,
            sourceUrl: "https://wa.me", // pode colocar outro link fake se quiser
          },
        },
      });

      await sendReact("📜");
    } catch (error) {
      errorLog(error);
      await sendErrorReply("Erro ao enviar pedido ❌");
    }
  },
}; 
