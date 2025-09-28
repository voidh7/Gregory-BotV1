const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX, OWNER_JID } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "avisoG",
  description: "Dono envia mensagem em todos os grupos com menção a todos",
  commands: ["avisoG"],
  usage: `${PREFIX}avisoG <mensagem>`,
  handle: async ({
    socket,
    sendReact,
    sendReply,
    sendErrorReply,
    args,
    sender,
  }) => {
    try {
      // Apenas dono pode usar
      if (sender !== OWNER_JID) {
        return sendErrorReply("❌ apenas o meu supremo mestre voidh7 pode usar esse comando");
      }

      if (!args.length) {
        return sendErrorReply(`Uso: ${PREFIX}avisoG <mensagem>`);
      }

      const message = args.join(" ");
      const groupsMeta = await socket.groupFetchAllParticipating();
      const groups = Object.values(groupsMeta);

      for (const group of groups) {
        try {
          const members = group.participants.map(p => p.id);

          await socket.sendMessage(group.id, {
            text: message,
            mentions: members,
          });
        } catch (e) {
          errorLog(e);
        }
      }

      await sendReact("📢");
      await sendReply("Mensagem enviada em todos os grupos ✅");
    } catch (error) {
      errorLog(error);
      await sendErrorReply("Erro ao enviar aviso ❌");
    }
  },
};
