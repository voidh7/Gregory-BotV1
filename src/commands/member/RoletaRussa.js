const path = require("path");
const { PREFIX, ASSETS_DIR, BOT_NUMBER, OWNER_NUMBER } = require(`${BASE_DIR}/config`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const { DangerError } = require(`${BASE_DIR}/errors`);

function gerarNumero() {
  return Math.floor(Math.random() * 2); // 0 ou 1
}

module.exports = {
  name: "roletaRussa",
  description: "Roleta russa mortal: se perder, é banido",
  commands: ["roletaRussa"],
  usage: `${PREFIX}roletaRussa`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendImageFromFile, sendReply, sendSuccessReact, userJid }) => {
    const primaryRes = gerarNumero();
    const numero = onlyNumbers(userJid);

    if (numero === OWNER_NUMBER) {
      throw new DangerError("Você é o dono do bot. Está imune 😎");
    }

    if (userJid === toUserJid(BOT_NUMBER)) {
      throw new DangerError("Eu não posso me auto-banir 😐");
    }

    await sendSuccessReact();

    const imagemPath = path.join(ASSETS_DIR, "images", "roletaRussa.jpg");

    if (primaryRes === 0) {
      // Perdeu, envia a mensagem antes de remover
      await sendImageFromFile(
        imagemPath,
        "*Resultado:*\n☠️ Você perdeu na roleta russa...\nAdeus.\n(peça para um admin te adicionar depois)"
      );

      // Aguarda 2 segundos antes de remover, pra garantir envio
      await new Promise((r) => setTimeout(r, 2000));

      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");
    } else {
      // Sobreviveu
      await sendImageFromFile(
        imagemPath,
        "*Resultado:*\n🎉 Você sobreviveu à roleta russa!\nMas a sorte não dura pra sempre..."
      );
    }
  },
};