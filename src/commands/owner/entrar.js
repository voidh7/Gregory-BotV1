/**
 * Comando para o bot entrar em grupo via link de convite
 *
 * Uso: /entrar <link do grupo>
 */
const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX, OWNER_JID } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "entrar",
  description: "Bot entra em grupo usando link de convite",
  commands: ["entrar"],
  usage: `${PREFIX}entrar <link do grupo>`,
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
        return sendErrorReply("❌ Apenas o dono pode usar este comando.");
      }

      if (!args.length) {
        return sendErrorReply(`Uso: ${PREFIX}entrar <link do grupo>`);
      }

      const inviteLink = args[0];

      // Extrai o código do link
      const codeMatch = inviteLink.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/);
      if (!codeMatch) {
        return sendErrorReply("❌ Link de convite inválido.");
      }
      const inviteCode = codeMatch[1];

      // Aceita o convite
      await socket.groupAcceptInvite(inviteCode);

      await sendReact("✅");
      await sendReply("Entrei no grupo com sucesso!");
    } catch (error) {
      errorLog(error);
      await sendErrorReply("Erro ao entrar no grupo ❌");
    }
  },
};
