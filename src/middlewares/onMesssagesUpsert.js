const {
  isAtLeastMinutesInPast,
  GROUP_PARTICIPANT_ADD,
  GROUP_PARTICIPANT_LEAVE,
  isAddOrLeave,
} = require("../utils");
const { DEVELOPER_MODE, prefixo,SO_OWNER } = require("../config");
const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommonFunctions } = require("../utils/loadCommonFunctions");
const { onGroupParticipantsUpdate } = require("./onGroupParticipantsUpdate");
const { errorLog, infoLog } = require("../utils/logger");
const { badMacHandler } = require("../utils/badMacHandler");
const { checkIfMemberIsMuted, isActiveOnlyAdmins } = require("../utils/database");
const { messageHandler } = require("./messageHandler");

const warnedUsers = new Set();

exports.onMessagesUpsert = async ({ socket, messages, startProcess }) => {
  if (!Array.isArray(messages) || messages.length === 0) return;

  for (const webMessage of messages) {
    if (DEVELOPER_MODE) {
      infoLog(
        `\n\n⪨========== [ MENSAGEM RECEBIDA ] ==========⪩ \n\n${JSON.stringify(
          messages,
          null,
          2
        )}`
      );
    }

    try {
      const timestamp = webMessage.messageTimestamp;

      // chama handler principal da mensagem
      if (webMessage?.message) await messageHandler(socket, webMessage);

      // ignora mensagens antigas
      if (isAtLeastMinutesInPast(timestamp)) continue;

      // adiciona ou remove participantes
      if (isAddOrLeave.includes(webMessage.messageStubType)) {
        let action = "";
        if (webMessage.messageStubType === GROUP_PARTICIPANT_ADD) action = "add";
        else if (webMessage.messageStubType === GROUP_PARTICIPANT_LEAVE) action = "remove";

        await onGroupParticipantsUpdate({
          userJid: webMessage.messageStubParameters?.[0],
          remoteJid: webMessage.key?.remoteJid,
          socket,
          action,
        });
        continue;
      }

      // carrega funções comuns
      const commonFunctions = loadCommonFunctions({ socket, webMessage });
      if (!commonFunctions) continue;

      // checa se membro está mutado
      if (checkIfMemberIsMuted(commonFunctions.remoteJid, commonFunctions.userJid)) {
        try { 
          await commonFunctions.deleteMessage(webMessage.key); 
        } catch (error) { 
          errorLog(`Erro ao deletar mensagem de membro silenciado: ${error.message}`); 
        }
        continue;
      }

      // checa se o grupo é apenas para admins
      if (isActiveOnlyAdmins(commonFunctions.remoteJid)) {
        let isAdminOrOwner = true;

        try {
          const groupMetadata = await socket.groupMetadata(commonFunctions.remoteJid);
          const participants = groupMetadata?.participants;

          if (Array.isArray(participants)) {
            isAdminOrOwner = participants.some(
              (p) =>
                p.id === commonFunctions.userJid &&
                (p.admin === "admin" || p.admin === "superadmin" || p.id === process.env.BOT_OWNER_ID)
            );
          } else {
            isAdminOrOwner = true;
          }
        } catch {
          isAdminOrOwner = true;
        }

        // garante que prefixo é array
        const prefixArray = Array.isArray(prefixo) ? prefixo : [String(prefixo || "!")];

        const bodyMsg = commonFunctions.body?.trim() || commonFunctions.caption?.trim() || "";
        const isCommand = prefixArray.some((p) => bodyMsg.startsWith(p));

        if (!isAdminOrOwner && isCommand) {
          if (!warnedUsers.has(commonFunctions.userJid)) {
            try {
              await commonFunctions.sendReply("🚫 Somente administradores ou o dono podem usar comandos neste grupo!");
            } catch (err) {
              errorLog(`Erro ao avisar usuário: ${err.message}`);
            }
            warnedUsers.add(commonFunctions.userJid);
            setTimeout(() => warnedUsers.delete(commonFunctions.userJid), 10000);
          }
          continue;
        }
      }

      // executa comando dinâmico
      await dynamicCommand(commonFunctions, startProcess);

    } catch (error) {
      if (badMacHandler.handleError(error, "message-processing")) continue;
      if (badMacHandler.isSessionError(error)) { 
        errorLog(`Erro de sessão: ${error.message}`); 
        continue; 
      }
      errorLog(`Erro ao processar mensagem: ${error.message}`);
    }
  }
}; 
