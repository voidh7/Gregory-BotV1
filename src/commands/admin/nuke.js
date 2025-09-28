const { OWNER_NUMBER } = require("../../config");

const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);
const { toUserJid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "nuke",
  description: "Remove todos os membros do grupo ",
  commands: ["nuke"],
  usage: `${PREFIX}nuke`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    socket,
    remoteJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {

    const metadata = await socket.groupMetadata(remoteJid);
    const participants = metadata.participants.map(p => p.id);

    const botJid = toUserJid(BOT_NUMBER);


    const membersToRemove = participants.filter(jid =>
      jid !== userJid &&
      jid !== botJid &&
      !jid.includes(OWNER_NUMBER) 
    );

    if (!membersToRemove.length) {
      await sendReply("Nenhum membro para remover!");
      return;
    }

    
    await socket.groupParticipantsUpdate(remoteJid, membersToRemove, "remove");

    await sendSuccessReact();
    await sendReply(`Todos os membros foram removidos! Total: ${membersToRemove.length}`);
  },
}; 
