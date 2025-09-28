const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "infoGp",
  description: "comando obter informações detalhadas do grupo",
  commands: ["infoGp"],
  usage: `${PREFIX}infoGp`,                                       /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendErrorReply,
    getGroupMetadata,
    isGroup,
    socket,
    remoteJid,
  }) => {
    await sendReact("👥");
    await delay(3000);

    if (!isGroup) {
      return await sendErrorReply("Este comando só funciona em grupos!");
    }

    await sendReply("Vou obter as informações do grupo atual:");
    await delay(3000);

    try {
      const groupMetadata = await getGroupMetadata();

      const groupInfo = `👥 *Informações do Grupo:*

📝 *Básico:*
• Nome: ${groupMetadata.subject}
• Descrição: ${groupMetadata.desc || "Sem descrição"}
• ID: ${groupMetadata.id}

👤 *Participantes:*
• Total: ${groupMetadata.participants.length} membros
• Admins: ${groupMetadata.participants.filter((p) => p.admin).length}
• Membros: ${groupMetadata.participants.filter((p) => !p.admin).length}

⚙️ *Configurações:*
• Criado em: ${new Date(groupMetadata.creation * 1000).toLocaleDateString("pt-BR")}
• Dono: ${groupMetadata.owner || "N/A"}
• Apenas admins podem enviar: ${groupMetadata.announce ? "Sim" : "Não"}
• Aprovação para entrar: ${groupMetadata.restrict ? "Sim" : "Não"}`;

      await sendReply(groupInfo);
      await delay(3000);

      const admins = groupMetadata.participants.filter((p) => p.admin);

      if (admins.length > 0) {
        const adminList =
          `👑 *Administradores (${admins.length}):*\n\n` +
          admins
            .map(
              (admin, index) =>
                `${index + 1}. @${admin.id.split("@")[0]} ${
                  admin.admin === "superadmin" ? "(Criador)" : "(Admin)"
                }`
            )
            .join("\n");

        await socket.sendMessage(remoteJid, {
          text: adminList,
          mentions: admins.map((admin) => admin.id),
        });
      }

      await delay(3000);
    } catch (error) {
      await sendErrorReply(`Erro ao obter dados do grupo: ${error.message}`);
    }
  },
}
