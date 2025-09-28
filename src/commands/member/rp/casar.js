const { loadFamiliaDB, saveFamiliaDB, getUser } = require("./utils");

module.exports = {
  name: "casar",
  description: "Tente casar com alguém",
  commands: ["casar"],
  usage: "/casar @usuario",
  handle: async ({ socket, remoteJid, userJid, args, message }) => {
    const db = loadFamiliaDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, userId);

    if (user.status === "casado") {
      return socket.sendMessage(remoteJid, {
        text: `❌ Você já é casado(a).`,
        mentions: [userJid],
        quoted: message
      });
    }

    const targetId = args[0]?.replace("@", "");
    if (!targetId) return socket.sendMessage(remoteJid, { text: "💡 Use: /casar @usuario", quoted: message });

    const target = getUser(db, targetId);
    if (target.status === "casado") {
      return socket.sendMessage(remoteJid, { text: "❌ Esta pessoa já é casada.", quoted: message });
    }

    // Pergunta se aceita
    await socket.sendMessage(remoteJid, {
      text: `💌 @${targetId}, você aceita casar com @${userId}? Responda com "s" ou "n".`,
      mentions: [userJid, `${targetId}@s.whatsapp.net`],
      quoted: message
    });

    // Escuta resposta
    const filter = (msg) => msg.key.remoteJid === remoteJid && msg.message?.conversation?.toLowerCase() === "s" || msg.message?.conversation?.toLowerCase() === "n";
    socket.once("message", (msg) => {
      const resp = msg.message.conversation.toLowerCase();
      if (resp === "s") {
        user.status = "casado";
        user.parceiro = targetId;
        target.status = "casado";
        target.parceiro = userId;
        saveFamiliaDB(db);
        socket.sendMessage(remoteJid, {
          text: `💑 @${userId} e @${targetId} agora são casados!`,
          mentions: [userJid, `${targetId}@s.whatsapp.net`]
        });
      } else {
        socket.sendMessage(remoteJid, { text: `❌ @${userId}, o casamento foi recusado.`, mentions: [userJid] });
      }
    });
  }
};
