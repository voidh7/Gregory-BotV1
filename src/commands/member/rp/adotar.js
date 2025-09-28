const { loadFamiliaDB, saveFamiliaDB, getUser } = require("./utils");

module.exports = {
  name: "adotar",
  description: "Adote um filho(a)",
  commands: ["adotar"],
  usage: "/adotar @usuario",
  handle: async ({ socket, remoteJid, userJid, args, message }) => {
    const db = loadFamiliaDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, userId);

    const targetId = args[0]?.replace("@", "");
    if (!targetId) return socket.sendMessage(remoteJid, { text: "💡 Use: /adotar @usuario", quoted: message });

    const target = getUser(db, targetId);

    // Pergunta se aceita
    await socket.sendMessage(remoteJid, {
      text: `👶 @${targetId}, você aceita ser adotado(a) por @${userId}? Responda com "s" ou "n".`,
      mentions: [userJid, `${targetId}@s.whatsapp.net`],
      quoted: message
    });

    socket.once("message", (msg) => {
      const resp = msg.message.conversation.toLowerCase();
      if (resp === "s") {
        user.filhos.push(targetId);
        target.pais.push(userId);
        saveFamiliaDB(db);
        socket.sendMessage(remoteJid, {
          text: `👶 @${userId} adotou @${targetId} como filho(a)!`,
          mentions: [userJid, `${targetId}@s.whatsapp.net`]
        });
      } else {
        socket.sendMessage(remoteJid, { text: `❌ A adoção foi recusada.`, mentions: [userJid] });
      }
    });
  }
};
